import Link from "next/link";
//import { useForm } from "react-hook-form";
import { useMulti, useCreate, useSingle } from "@vulcanjs/react-hooks";

import MDXMuiLayout from "~/components/layout/MDXMuiLayout";
import Tweek, { TweekType } from "~/models/tweek";
import Twaik, { TwaikType } from "~/models/twaik";

const HomePage = () => {
  const {
    data: latestTweeksData,
    loading: loadingTweeks,
    error: errorTweeks,
  } = useMulti<TweekType>({
    model: Tweek,
    input: {
      limit: 5,
      sort: { createdAt: "asc" },
    },
  });
  const {
    data: randomTweekData,
    loading: loadingRandomTweek,
    error: errorRandomTweek,
  } = useSingle<TweekType>({
    model: Tweek,
    input: {
      filter: {},
    },
  });
  const randomTweek = randomTweekData?.tweek?.result;
  const [createTwaik] = useCreate<TwaikType>({
    model: Twaik,
  });
  return (
    <MDXMuiLayout>
      <main>
        <h2>Write your own Twaiku</h2>
        {(errorRandomTweek || (!loadingRandomTweek && !randomTweek)) && (
          <p>No tweek to complete, sorry :(</p>
        )}
        {loadingRandomTweek && <p>Loading a tweek...</p>}
        {randomTweek && <p>{randomTweek.text}</p>}
        {randomTweek && (
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              const text = evt.target["text"].value;
              createTwaik({
                input: { data: { text, tweekId: randomTweek._id } },
              });
            }}
          >
            <input type="text" name="text" autoFocus />
            <button type="submit">Tweek</button>
          </form>
        )}
        <h2>Latest tweeks</h2>
        {errorTweeks && "Error while fetching tweeks"}
        <ul>
          {loadingTweeks && <li>Loading tweeks...</li>}
          {latestTweeksData &&
            latestTweeksData.tweeks.results.map((tweek) => (
              <li key={tweek._id}>
                {tweek.text}{" "}
                <button>
                  <Link href={`/tweek/${tweek._id}`}>
                    <a>Edit</a>
                  </Link>
                </button>
                {/*<button
                  onClick={() => deleteTweek({ input: { id: tweek._id } })}
                >
                  X
                </button>*/}
              </li>
            ))}
        </ul>
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

export default HomePage;
