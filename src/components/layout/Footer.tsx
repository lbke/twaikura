/**
 * TODO: the useUser hook doesn't seem to be updated on route change when the component is put into _app
 */
// Taken from Next Passport example
import Link from "next/link";
import { useUser } from "~/components/user/hooks";
import { routes } from "~/lib/routes";

const Header = () => {
  const user = useUser();
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link href={routes.home.href}>
              <a>Twaikura</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href={routes.moderation.href}>
                  <a>Moderation</a>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <a href="/api/logout">Logout</a>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
          <li>
            <Link href={routes.terms.href}>
              <a>Terms</a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        nav {
          max-width: 42rem;
          margin: 0 auto;
          padding: 0.2rem 1.25rem;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        footer {
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </footer>
  );
};

export default Header;
