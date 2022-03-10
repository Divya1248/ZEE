import { axios } from "axios";

export let Signup = payload => {
  return async dispatch => {
    await axios
      .post("/signup", payload)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log("successfully registered");
    dispatch({
      type: "signup",
      payload: payload,
    });
  };
};

export let Signin = data => {
  return async dispatch => {
    await axios
      .post("/signin", data)
      .then(res => {
        localStorage.setItem("signin", res.data.token);
      })
      .catch(err => {
        console.log(err);
      });
    console.log("successfully registered");
    dispatch({
      type: "signin",
      payload: data,
    });
  };
};

export let CreateMovies = payload => {
  return async dispatch => {
    await axios
      .post("/MovieRouter/movieData", data)
      .then(res => {
        console.log(res)
        console.log(payload)
      })
      .catch(err => {
        console.log(err);
      });
    console.log("successfully registered");
    dispatch({
      type: "Movies",
      payload: payload,
    });
  };
};
