export const INITIAL_INGREDIENTS_STATE = {
  ingredients: [],
  loading: false,
  error: null,
};

export const ingredientsReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "GET_INGREDIENTS":
      return {
        ...state,
        loading: false,
        ingredients: [...action.payload],
      };
    case "POST_INGREDIENT":
      return {
        ...state,
        loading: false,
        ingredients: [...state.ingredients, action.payload.ingredient],
      };
    default:
      return state;
  }
};
