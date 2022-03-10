let initialState = {
  SIGNUP: [],
  SIGNIN: [],
  MOVIES: [],
};

let AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case signup:
      return {
        ...state,
        SIGNUP: action.payload,
      };
    case signin:
      return {
        ...state,
        SIGNIN: action.payload,
      };
    case Movies:
      return {
        ...state,
        MOVIES: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
