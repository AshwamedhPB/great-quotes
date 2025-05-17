import { NavLink, Link } from "react-router-dom";
import Classes from "./MainNavigation.module.css";
import { useSelector } from "react-redux";

const MainNaviation = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <header className={Classes.header}>
      <div className={Classes.logo}>
        <Link to="/quotes">
          <span className="logo_G">G</span>reat{" "}
          <span className="logo_Q">Q</span>uotes
        </Link>
      </div>
      <nav className={Classes.nav}>
        <ul>
          <li>
            <NavLink activeClassName={Classes.active} to="/quotes">
              Quotes
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={Classes.active} to="/new-quote">
              Add quote
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={Classes.active} to="/poems">
              Poems
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={Classes.active} to="/new-poem">
              Add poem
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={Classes.active} to="/login">
              {isLoggedIn ? "Logout" : "Login"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNaviation;
