export const INITIAL_USERS_STATE = {
  user: null,
  token: null,
  error: null,
  loading: false,
};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return { ...state, user: null, token: null, loading: false };
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "REGISTER":
      return {
        ...state,
        loading: false,
      };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    case "LOGIN":
      return {
        ...state,
        user: { ...action.payload.user },
        token: action.payload.token,
        loading: false,
      };
    default:
      return state;
  }
};
