import { createContext, useReducer } from "react";
import {
  INITIAL_RECIPES_STATE,
  recipesReducer,
} from "../reducers/recipes/recipes.reducer";

export const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipesReducer, INITIAL_RECIPES_STATE);

  return (
    <RecipesContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
