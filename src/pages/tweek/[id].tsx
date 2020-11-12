//import { useForm } from "react-hook-form";
import MDXMuiLayout from "~/components/layout/MDXMuiLayout";
import { useUpdate, useSingle } from "@vulcanjs/react-hooks";
import Tweek from "~/models/tweek";

import { useRouter } from "next/router";

const TweekUpdatePage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const {
    data: tweekData,
    loading: loadingTweek,
    error: errorTweek,
  } = useSingle({
    model: Tweek,
    input: {
      id,
    },
  });

  const tweek =
    (tweekData && tweekData.tweek && tweekData.tweek.result) || null;

  const [updateTweek /*, { data: updatedTweek }*/] = useUpdate({
    model: Tweek,
  });
  return (
    <MDXMuiLayout>
      <main>
        {/*<Home />*/}
        {errorTweek && "Error while fetching tweeks"}
        {loadingTweek && <li>Loading tweek...</li>}
        {tweekData && (
          <div>
            <h2>Tweek</h2>
            {/*<pre>
              <code>{JSON.stringify(tweek, null, 2)}</code>
            </pre>*/}
            <h3
              style={{
                background: "linear-gradient(to right, violet, pink)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                maxWidth: "250",
              }}
            >
              {tweek.text}
            </h3>
            <h2>Update tweek</h2>
            <form
              onSubmit={(evt) => {
                evt.preventDefault();
                const text = evt.target["text"].value;
                // TODO: create tweek
                updateTweek({ input: { data: { text }, id: id } });
              }}
            >
              <input defaultValue={tweek.text} type="text" name="text" />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
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

export default TweekUpdatePage;
