import { API } from "../../utils/API/API";

export const getRecipes = async (dispatch) => {
  dispatch({ type: "LOADING" });

  const { error, response } = await API({ endpoint: "/recipes" });

  if (error) {
    dispatch({ type: "ERROR", payload: error });
  } else {
    dispatch({ type: "GET_RECIPES", payload: response });
  }
};

export const filterRecipes = async (dispatch, data) => {
  dispatch({ type: "LOADING" });

  let query = "/recipes?";

  for (const key in data) {
    if (data[key]) {
      query += `${key}=${data[key]}&`;
    }
  }

  const { error, response } = await API({
    endpoint: query,
  });

  if (error) {
    dispatch({ type: "ERROR", payload: error });
  } else {
    console.log(response);
    dispatch({ type: "GET_RECIPES", payload: response });
  }
};

export const toggleLike = async (
  idRecipe,
  dispatch,
  idUser,
  addLike = true,
  recipes
) => {
  let newRecipes = [];

  newRecipes = recipes.map((recipe) => {
    if (recipe._id === idRecipe) {
      addLike
        ? recipe.likes.push(idUser)
        : recipe.likes.splice(recipe.likes.indexOf(idUser), 1);
    }
    return recipe;
  });

  dispatch({ type: "TOGGLE_LIKE", payload: newRecipes });

  const { error, response } = await API({
    method: "PUT",
    endpoint: `/recipes/toggleLike/${idRecipe}/${addLike}`,
    content_type: true,
    body: { likes: [idUser] },
  });
};

export const createRecipe = async (body, dispatch, setStep) => {
  dispatch({ type: "LOADING" });

  console.log(body);

  const { error, response } = await API({
    method: "POST",
    endpoint: "/recipes",
    body,
  });

  if (!error) {
    setStep(1);
    dispatch({ type: "CREATE_RECIPE", payload: response.recipe._id });
  }

  console.log(error);
  console.log(response);
};

export const updateRecipe = async (body, dispatch, navigate, id) => {
  dispatch({ type: "LOADING" });

  const { error, response } = await API({
    method: "PUT",
    endpoint: `/recipes/${id}`,
    body,
    content_type: true,
  });

  if (!error) {
    dispatch({ type: "UPDATE_RECIPE", payload: response.recipe });
    navigate(`/recipe/${response.recipe._id}`);
  }
};

export const getRecipe = async (dispatch, id) => {
  dispatch({ type: "LOADING" });

  const { error, response } = await API({ endpoint: `/recipes/${id}` });

  if (error) {
    dispatch({ type: "ERROR", payload: error });
  } else {
    dispatch({ type: "GET_RECIPE", payload: response });
  }
};