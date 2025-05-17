import { useRef, Fragment, useState } from "react";
import "./AdminLoginFrom.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const AdminLoginForm = (props) => {
  const usernameInputRef = useRef();
  const emailInputref = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const users = useSelector((state) => state.usersObj);
  const dispatch = useDispatch();
  const [register, setRegister] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  let username;
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const password = passwordInputRef.current.value;
    const email = emailInputref.current.value;
    let cPassword;
    if (register) {
      cPassword = confirmPasswordInputRef.current.value;
    }
    if (password !== cPassword && register) {
      setError("Password Do not Match");
      return;
    }
    let url;
    if (register) {
      username = usernameInputRef.current.value;
      if (username === "Kick") {
        setError("Username Exists");
        return;
      }
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHHnmRLqxVC7A2y9F530bBKNUNTp6pEzs";

      dispatch({ type: "ADDUSERNAME", email, username });
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHHnmRLqxVC7A2y9F530bBKNUNTp6pEzs";
      username = users[`${email}`];
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        } else {
          dispatch({ type: "LOGIN", token: data.idToken, username });
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("username", username);
          localStorage.setItem("expireTime", String(+data.expiresIn * 1000));
          history.goBack();
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
  };

  const registerHandler = () => {
    setRegister(true);
  };

  const signInHandler = () => {
    setRegister(false);
  };

  if (isLoggedIn) {
    return (
      <div>
        <div className="formTitle">
          <h4>{`Are you sure to Logout?`}</h4>
        </div>
        <div className="mainform">
          <div className="actions">
            <button className="btn" onClick={logoutHandler}>
              Yes
            </button>
            <span> </span>
            <button className="btn" onClick={props.onClick} type="button">
              No
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="formTitle">
        {!register && <h4>Sign in</h4>}
        {register && <h4>Sign Up</h4>}
      </div>
      <form className="mainform" onSubmit={formSubmitHandler}>
        {register && (
          <div className="inputfield">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" ref={usernameInputRef} />
          </div>
        )}

        <div className="inputfield">
          <label htmlFor="email">Enter email</label>
          <input type="email" id="email" ref={emailInputref} />
        </div>

        <div className="inputfield">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            autoComplete="on"
          />
        </div>

        {register && (
          <div className="inputfield">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="text"
              id="confirmPassword"
              ref={confirmPasswordInputRef}
              autoComplete="on"
            />
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="actions">
          <button className="btn">Submit</button>
          <span> </span>
          <button className="btn" onClick={props.onClick} type="button">
            Close
          </button>
        </div>
        {!register && (
          <div className="actions">
            <button className="btn" onClick={registerHandler} type="button">
              Register
            </button>
          </div>
        )}
        {register && (
          <div className="actions">
            <button className="btn" onClick={signInHandler} type="button">
              Sign In
            </button>
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default AdminLoginForm;
