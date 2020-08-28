// /*

// Generic mutation wrapper to insert a new document in a collection and update
// a related query on the client with the new item and a new total item count.

// Sample mutation:

//   mutation createMovie($data: CreateMovieData) {
//     createMovie(data: $data) {
//       data {
//         _id
//         name
//         __typename
//       }
//       __typename
//     }
//   }

// Arguments:

//   - data: the document to insert

// Child Props:

//   - createMovie({ data })

// */

import { useMutation, MutationHookOptions } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { createClientTemplate } from "@vulcan/graphql";
import { VulcanModel } from "@vulcan/model";
import { multiQueryUpdater } from "./multiQueryUpdater";
import { MutationResult } from "@apollo/react-common";

export const buildCreateQuery = ({ typeName, fragmentName, fragment }) => {
  const query = gql`
    ${createClientTemplate({ typeName, fragmentName })}
    ${fragment}
  `;
  return query;
};

// Add data into the resolverName
const buildResult = (options, resolverName, executionResult) => {
  const { data } = executionResult;
  const propertyName = options.propertyName || "document";
  const props = {
    ...executionResult,
    [propertyName]: data && data[resolverName] && data[resolverName].data,
  };
  return props;
};

// TODO: those typings are still very partial
type UseCreateOptions = {
  model: VulcanModel;
  fragment: string;
  fragmentName: string;
  mutationOptions?: MutationHookOptions;
  // extraQueries?: any;
};
interface CreateInput<T> {
  input: {
    data: T;
  };
}
type CreateFunc<T = any> = (args: CreateInput<T>) => void;
type UseCreateResult<T = any> = [CreateFunc<T>, MutationResult<T>]; // return the usual useMutation result, but with an abstracted creation function
export const useCreate = (options: UseCreateOptions): UseCreateResult => {
  const { model, fragment, fragmentName, mutationOptions = {} } = options;

  const { typeName } = model.options.graphql;

  const query = buildCreateQuery({ typeName, fragmentName, fragment });

  const resolverName = `create${typeName}`;

  const [createFunc, ...rest] = useMutation(query, {
    update: multiQueryUpdater({
      fragment,
      fragmentName,
      model,
      resolverName,
    }),
    ...mutationOptions,
  });

  const extendedCreateFunc = async (args) => {
    const executionResult = await createFunc({
      variables: { input: args.input, data: args.data },
    });
    return buildResult(options, resolverName, executionResult);
  };
  return [extendedCreateFunc, ...rest];
};
