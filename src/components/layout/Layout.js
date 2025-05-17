import { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import Classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={Classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
