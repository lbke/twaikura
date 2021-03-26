import { SyntheticEvent, useState, useRef } from "react";
//import { useForm } from "react-hook-form";
import { useMulti, useCreate, useSingle } from "@vulcanjs/react-hooks";

import MDXMuiLayout from "~/components/layout/MDXMuiLayout";
import Tweek, { TweekType } from "~/models/tweek";
import Twaik, { TwaikType } from "~/models/twaik";
import { gql } from "@apollo/client";

const TwaikForm = () => {
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

  // Form state management
  const textInputRef = useRef<HTMLInputElement>();
  const [isCreatingTwaik, setIsCreatingTwaik] = useState(false);
  const [hasCreatedTwaik, setHasCreatedTwaik] = useState(false);
  const [hasFailedCreatingTwaik, setHasFailedCreatingTwaik] = useState(false);
  const onTwaikCreate = async (evt: SyntheticEvent<HTMLFormElement>) => {
    try {
      evt.preventDefault();
      setIsCreatingTwaik(true);
      setHasCreatedTwaik(false);
      setHasFailedCreatingTwaik(false);
      const text = evt.target["text"].value;
      await createTwaik({
        input: { data: { text, tweekId: randomTweek._id } },
      });
      evt.target["text"].value = "";
      setHasCreatedTwaik(true);
    } catch (e) {
      setHasFailedCreatingTwaik(true);
    } finally {
      // focus again
      setIsCreatingTwaik(false);
      textInputRef.current.focus();
    }
  };
  return (
    <>
      {(errorRandomTweek || (!loadingRandomTweek && !randomTweek)) && (
        <p>No Tweek to complete, sorry :(</p>
      )}
      {loadingRandomTweek && <p>Loading a tweek...</p>}
      {randomTweek && <p>{randomTweek.text}</p>}
      {randomTweek && (
        <form onSubmit={onTwaikCreate}>
          <input
            ref={textInputRef}
            type="text"
            name="text"
            autoFocus
            maxLength={120}
          />
          {!isCreatingTwaik && <button type="submit">Tweek</button>}
          {isCreatingTwaik && (
            <button type="submit" disabled>
              Tweeking...
            </button>
          )}
          {hasCreatedTwaik && <p>Successfully Tweeked</p>}
          {hasFailedCreatingTwaik && <p>Failed Tweeking :(</p>}
        </form>
      )}
    </>
  );
};

// NOTE: we cannot compute the TData automatically because "twaiks" is dynamic
// in the futur we might prefer a static name common to all models (like just "results")
const useLatestTwaiks = () =>
  useMulti<TwaikType, { twaiks: { results: Array<TwaikType> } }>({
    model: Twaik,
    input: {
      limit: 5,
      sort: { createdAt: "asc" },
    },
    // default fragment won't include relations at this point
    // you have to add them manually (like "tweek" here)
    fragmentName: "WithTweeks",
    fragment: gql`
      fragment WithTweeks on Twaik {
        _id
        createdAt
        text
        tweekId
        tweek {
          _id
          text
        }
      }
    `,
  });

const TwaikusList = () => {
  const {
    data: latestTwaiksData,
    loading: loadingTwaiks,
    error: errorTwaiks,
  } = useLatestTwaiks();
  const latestTwaiks = latestTwaiksData.twaiks.results;
  return (
    <>
      {errorTwaiks && "Error while fetching tweeks"}
      <ul>
        {loadingTwaiks && <p>Loading twaikus...</p>}
        {!loadingTwaiks && !errorTwaiks && !latestTwaiks?.length && (
          <p>No Twaikus yet :'O</p>
        )}
        {latestTwaiks &&
          latestTwaiks.map((twaik) => (
            <li key={twaik._id}>
              {twaik?.tweek?.text} {twaik.text}
              {/*<button>
                  <Link href={`/tweek/${tweek._id}`}>
                    <a>Edit</a>
                  </Link>
                </button>
                */}
              {/*<button
                  onClick={() => deleteTweek({ input: { id: tweek._id } })}
                >
                  X
                </button>*/}
            </li>
          ))}
      </ul>
    </>
  );
};

const HomePage = () => {
  return (
    <MDXMuiLayout>
      <main>
        <h2>Write your own Twaiku</h2>
        <TwaikForm />
        <h2>Latest Twaikus</h2>
        <TwaikusList />
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
