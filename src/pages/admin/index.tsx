import React from "react";
import { useMulti } from "@vulcanjs/react-hooks";
import Twaik from "~/models/twaik";
import Tweek from "~/models/tweek";
import { User } from "~/models/user";

const AdminPage = () => {
  const tweeksResult = useMulti({ model: Tweek });
  const tweeks = tweeksResult?.data?.tweeks?.results || [];
  const twaiksResult = useMulti({ model: Twaik });
  const twaiks = twaiksResult?.data?.twaiks?.results || [];
  const usersResult = useMulti({ model: User });
  const users = usersResult?.data?.vulcanUsers?.results || [];
  return (
    <div>
      <h2>Tweeks</h2>
      <ul>
        {tweeks.map(({ _id, text }) => (
          <li key={_id}>{text}</li>
        ))}
      </ul>
      <h2>Twaiks</h2>
      <ul>
        {twaiks.map(({ _id, text }) => (
          <li key={_id}>{text}</li>
        ))}
      </ul>
      <h2>Users</h2>
      <ul>
        {users.map(({ _id, text }) => (
          <li key={_id}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
