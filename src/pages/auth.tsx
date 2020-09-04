//import { useForm } from "react-hook-form";
import { withApollo } from "@vulcan/next-apollo";
import { VulcanMeteorHooks } from "@vulcan/meteor-legacy";

const AuthPage = () => {
  const [login] = VulcanMeteorHooks.useAuthenticateWithPassword();
  const [signup] = VulcanMeteorHooks.useSignup();
  const [logout] = VulcanMeteorHooks.useLogout();
  return (
    <div>
      <main>
        {/*<Home />*/}
        <h2>Signup</h2>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            const email = evt.target["email"].value;
            const password = evt.target["password"].value;
            signup({ input: { email, password } });
          }}
        >
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <button type="submit">Sign up</button>
        </form>
        <h2>Login</h2>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            const email = evt.target["email"].value;
            const password = evt.target["password"].value;
            login({ input: { email, password } });
          }}
        >
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <button type="submit">Login</button>
        </form>
        <h2>Logout</h2>
        <button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
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
    </div>
  );
};

// export default withApollo({ graphqlUri })(MyApp, { getDataFromTree });

export default withApollo(AuthPage);
