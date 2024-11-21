import { createContext, useReducer } from "react";
import {
  INITIAL_USERS_STATE,
  usersReducer,
} from "../reducers/users/users.reducer";

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, INITIAL_USERS_STATE);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
