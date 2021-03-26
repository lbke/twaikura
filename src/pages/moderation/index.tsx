import { useMulti } from "@vulcanjs/react-hooks";
import { PageLayout } from "~/components/layout";
import { useUser } from "~/components/user/hooks";
import Twaik, { TwaikType } from "~/models/twaik";

const useLatestInvalidTwaikus = () =>
  useMulti<TwaikType, { twaiks: { results: Array<TwaikType> } }>({
    model: Twaik,
    input: {
      filter: { isValid: { _neq: true } },
      limit: 10,
      sort: {
        createdAt: "desc",
      },
    },
  });
const LatestInvalidTwaikusList = () => {
  const { data, error, loading } = useLatestInvalidTwaikus();
  if (error) throw error;
  if (loading) return <>"Loading"</>;
  if (!data) throw new Error("Not loading, no error, but no data");
  const twaiks = data?.twaiks.results;
  return (
    <ul>
      {twaiks.map((twaik) => (
        <li key={twaik._id}>
          {twaik.text} -{" "}
          <button
            onClick={() => {
              alert("TODO: add a validation mutation");
            }}
          >
            Validate
          </button>
        </li>
      ))}
    </ul>
  );
};
const Moderation = () => {
  /*const user = */ useUser({ redirectTo: "/login" }); // page is private
  return (
    <PageLayout>
      <section>
        <h2>Validate latest twaikus</h2>
        <p>Welcom moderator. Here, you can validate the latest twaikus</p>
        <LatestInvalidTwaikusList />
      </section>
    </PageLayout>
  );
};

export default Moderation;
