import { API } from "../../utils/API/API";

export const createIngredient = async (
  data,
  image,
  setError,
  imageRef,
  reset,
  setImage,
  dispatch,
  setOpenned,
  allergensSelected
) => {
  if (!image) {
    setError("image", {
      message: "Tienes que subir un logo para el ingrediente",
    });
    return;
  }

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("logo", imageRef.current.files[0]);

  for (const allergen of allergensSelected) {
    formData.append("allergens", allergen);
  }

  dispatch({ type: "LOADING" });

  const { error, response } = await API({
    method: "POST",
    endpoint: "/ingredients",
    body: formData,
  });

  if (error) {
    setError("subida", {
      message:
        "El ingrediente no se ha creado por fallo del servidor, prueba de nuevo en un rato",
    });
    dispatch({ type: "ERROR", payload: error });
  } else {
    dispatch({ type: "POST_INGREDIENT", payload: response });
    reset();
    setImage();
    setOpenned(true);
  }
};

export const getIngredients = async (dispatch) => {
  dispatch({ type: "LOADING" });

  const { error, response } = await API({ endpoint: "/ingredients" });

  if (error) {
    dispatch({ type: "ERROR", payload: error });
  } else {
    dispatch({ type: "GET_INGREDIENTS", payload: response });
  }
};
