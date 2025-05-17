import React, { Suspense } from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
const Quotes = React.lazy(() => import("./pages/Quotes"));
const Poems = React.lazy(() => import("./pages/Poems"));
const QuoteDetails = React.lazy(() => import("./pages/QuoteDetails"));
const PoemDetails = React.lazy(() => import("./pages/PoemDetails"));
const AddQuote = React.lazy(() => import("./pages/AddQuote"));
const AddPoem = React.lazy(() => import("./pages/AddPoem"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Modal = React.lazy(() => import("./components/UI/Modal"));
const AdminLoginForm = React.lazy(() =>
  import("./components/UI/AdminLoginForm")
);

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const hideModal = () => {
    history.push("/");
  };
  const retryHandler = () => {
    history.push("/login");
  };

  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const expireTime = localStorage.getItem("expireTime");
    dispatch({ type: "LOGIN", username, token });
    setTimeout(() => {
      localStorage.clear();
      dispatch({ type: "LOGOUT" });
    }, expireTime);
  }

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes"></Redirect>
          </Route>
          <Route path="/login" exact>
            <Modal onClick={hideModal}>
              <AdminLoginForm onClick={hideModal} retryHandler={retryHandler} />
            </Modal>
          </Route>
          <Route path="/quotes" exact>
            <Quotes />
          </Route>
          <Route path="/poems" exact>
            <Poems />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetails />
          </Route>
          <Route path="/poems/:poemId">
            <PoemDetails />
          </Route>
          <Route path="/new-quote">
            <AddQuote />
          </Route>
          <Route path="/new-poem">
            <AddPoem />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
