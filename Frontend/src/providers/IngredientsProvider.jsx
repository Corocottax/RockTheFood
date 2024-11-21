import { createContext, useReducer } from "react";
import {
  ingredientsReducer,
  INITIAL_INGREDIENTS_STATE,
} from "../reducers/ingredients/ingredients.reducer";

export const IngredientsContext = createContext();

const IngredientsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    ingredientsReducer,
    INITIAL_INGREDIENTS_STATE
  );

  return (
    <IngredientsContext.Provider value={{ state, dispatch }}>
      {children}
    </IngredientsContext.Provider>
  );
};

export default IngredientsProvider;
