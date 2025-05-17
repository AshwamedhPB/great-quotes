const redux = require("redux");

const loginReducer = (
  state = {
    isLoggedIn: false,
    username: "",
    token: "",
    usersObj: {
      "ashwamedhpb@gmail.com": "Kick",
    },
  },
  action
) => {
  if (action.type === "LOGIN") {
    return {
      isLoggedIn: true,
      username: action.username,
      token: action.token,
      usersObj: state.usersObj,
    };
  }
  if (action.type === "LOGOUT") {
    localStorage.clear();
    return {
      isLoggedIn: false,
      username: "",
      token: "",
      usersObj: state.usersObj,
    };
  }
  if (action.type === "ADDUSERNAME") {
    const email = action.email;
    const username = action.username;
    const newObj = { ...state.usersObj };
    newObj[`${email}`] = username;
    return {
      isLoggedIn: state.isLoggedIn,
      username: action.username,
      token: state.token,
      usersObj: newObj,
    };
  }

  return state;
};

const store = redux.createStore(loginReducer);

export default store;
