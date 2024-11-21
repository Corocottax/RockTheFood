export const INITIAL_RECIPES_STATE = {
  recipes: [],
  loading: false,
  error: null,
  recipeId: null,
  recipe: null
};

export const recipesReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    case "GET_RECIPES":
      return {
        ...state,
        error: null,
        loading: false,
        recipes: [...action.payload],
      };
    case "TOGGLE_LIKE":
      return {
        ...state,
        recipes: [...action.payload],
      };
    case "CREATE_RECIPE":
      return {
        ...state,
        loading: false,
        recipeId: action.payload,
      };
    case "UPDATE_RECIPE":
      return {
        ...state,
        loading: false,
        recipes: [...state.recipes, action.payload],
      };
    case "GET_RECIPE": 
      return {
        ...state, 
        recipe: { ...action.payload },
        loading: false
      }
    default:
      return state;
  }
};
