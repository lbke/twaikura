import { useQuery /*, useMutation*/ } from "@apollo/react-hooks";
import gql from "graphql-tag";
//import { useForm } from "react-hook-form";
import { withApollo } from "@vulcan/next-apollo";
import MDXMuiLayout from "~/components/layout/MDXMuiLayout";
import { useMulti, useCreate, useDelete } from "@vulcan/react-hooks";
import Tweek from "~/models/tweek";

const HomePage = () => {
  const vulcanSiteDataQuery = gql`
    query getSiteData {
      siteData {
        url
        title
        sourceVersion
        logoUrl
      }
    }
  `;
  const { data, loading, error } = useQuery(vulcanSiteDataQuery);

  const {
    data: tweeksData,
    loading: loadingTweeks,
    error: errorTweeks,
  } = useMulti({
    model: Tweek,
  });

  let content;
  if (loading) {
    content = `Connecting to your graphQL backend...`; // on ${client.name}`
  } else if (error) {
    if (error.networkError?.message === "Failed to fetch") {
      content = `No graphQL backend is running.`;
    } else {
      content = `Couldn't connect to your graphQL backend (${error}).`;
    }
  } else if (data) {
    content = `Successfully connected to your graphQL backend.\n Data: ${JSON.stringify(
      data,
      null,
      4
    )}`;
  }

  const [createTweek, { data: createdTweek }] = useCreate({
    model: Tweek,
  });
  const [deleteTweek] = useDelete({ model: Tweek });
  return (
    <MDXMuiLayout>
      <main>
        {/*<Home />*/}
        {content}
        {errorTweeks && "Error while fetching tweeks"}
        <ul>
          {loadingTweeks && <li>Loading tweeks...</li>}
          {tweeksData &&
            tweeksData.tweeks.results.map((tweek) => (
              <li key={tweek._id}>
                {tweek.text}{" "}
                <button
                  onClick={() => deleteTweek({ input: { id: tweek._id } })}
                >
                  X
                </button>
              </li>
            ))}
        </ul>
        <h2>Create a new tweek</h2>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            const text = evt.target["text"].value;
            // TODO: create tweek
            createTweek({ input: { data: { text } } });
          }}
        >
          <input type="text" name="text" />
          <button type="submit">Submit</button>
        </form>
      </main>
      <style jsx>{`
        main {
          border-left: 72px solid;
          padding-left: 24px;
          border-image-source: linear-gradient(10deg, #e1009855, #3f77fa55);
          border-image-slice: 1;
          border-color: #3f77fa;
        }
      `}</style>
    </MDXMuiLayout>
  );
};

// export default withApollo({ graphqlUri })(MyApp, { getDataFromTree });

export default withApollo(HomePage);
