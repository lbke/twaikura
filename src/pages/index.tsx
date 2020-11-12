import { useState } from "react";
import Link from "next/link";
import { useQuery /*, useMutation*/ } from "@apollo/client";
import { gql } from "@apollo/client";
//import { useForm } from "react-hook-form";
import {
  useMulti,
  useCreate,
  useDelete,
  useSingle,
} from "@vulcanjs/react-hooks";

import MDXMuiLayout from "~/components/layout/MDXMuiLayout";
import Tweek, { TweekType } from "~/models/tweek";

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
  // TODO: randomize, using a custom query instead
  const {
    data: randomLonelyTweek,
    loading: loadingRandomLonelyTweek,
    error: errorRandomLonelyTweek,
  } = useSingle<TweekType>({
    model: Tweek,
    input: {
      filter: {
        // tweek with no matching twaik
        twaikId: { _is_null: true },
      },
    },
  });
  const [createTweek, { data: createdTweek }] = useCreate({
    model: Tweek,
  });
  return (
    <MDXMuiLayout>
      <main>
        <h2>Write your own Twaiku</h2>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            const text = evt.target["text"].value;
            createTweek({ input: { data: { text } } });
          }}
        >
          <input type="text" name="text" autoFocus />
          <button type="submit">Tweek</button>
        </form>
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
