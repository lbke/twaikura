// /**
//  * Update cached list of data after a document creation
//  */
import { buildMultiQuery } from "./multi";
import {
  addToData,
  getVariablesListFromCache,
  matchSelector,
} from "./cacheUpdate";
import { filterFunction } from "@vulcan/mongo";
import { getApolloClient } from "@vulcan/next-apollo";
import debug from "debug";
const debugApollo = debug("vn:apollo");

export const multiQueryUpdater = ({
  fragment,
  fragmentName,
  model,
  resolverName,
}) => async (cache, { data }) => {
  // update multi queries
  const { typeName, multiTypeName, multiResolverName } = model.options.graphql;
  const multiQuery = buildMultiQuery({
    typeName,
    multiTypeName,
    fragmentName,
    fragment,
  });
  const newDoc = data[resolverName].data;
  // get all the resolvers that match
  const client = getApolloClient();
  const variablesList = getVariablesListFromCache(cache, multiResolverName); // TODO: mutli resolverName is wrong
  debugApollo(
    "Got variable list from cache",
    variablesList,
    "for resolverName",
    multiResolverName
  );
  // compute all necessary updates
  const multiQueryUpdates = (
    await Promise.all(
      variablesList.map(async (variables) => {
        try {
          const queryResult = cache.readQuery({ query: multiQuery, variables });
          // get mongo selector and options objects based on current terms
          const multiInput = variables.input;
          // TODO: the 3rd argument is the context, not available here
          // Maybe we could pass the currentUser? The context is passed to custom filters function
          const filter = await filterFunction(model, multiInput, {});
          const { selector, options: paramOptions } = filter;
          const { sort } = paramOptions;
          debugApollo("Got query", queryResult, ", and filter", filter);
          // check if the document should be included in this query, given the query filters
          if (matchSelector(newDoc, selector)) {
            debugApollo("Document matched, updating the data");
            // TODO: handle order using the selector
            const newData = addToData({
              queryResult,
              multiResolverName,
              document: newDoc,
              sort,
              selector,
            });
            // memorize updates just in case
            return { query: multiQuery, variables, data: newData };
          }
        } catch (err) {
          // could not find the query
          // TODO: be smarter about the error cases and check only for cache mismatch
          console.log(err);
        }
      })
    )
  ).filter((x) => !!x); // filter out null values
  // apply updates to the client
  multiQueryUpdates.forEach((update) => {
    debugApollo("Updating cache with query", update);
    client.writeQuery(update);
  });
  // return for potential chainging
  return multiQueryUpdates;
};
