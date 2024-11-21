import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import "./CreateRecipe.css";
import React, { useContext, useRef, useState } from "react";
import {
  createRecipe,
  updateRecipe,
} from "../../reducers/recipes/recipes.actions";
import { RecipesContext } from "../../providers/RecipesProvider";
import { IngredientsContext } from "../../providers/IngredientsProvider";
import { useNavigate } from "react-router-dom";
import { removeIngredientsDuplicates } from "../../utils/functions/removeIngredientsDuplicates";
import Step0 from "./Step0/Step0";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";

const ingredientsSelected = [];

const CreateRecipe = () => {
  const [image, setImage] = useState();
  const imageRef = useRef();
  const { register, handleSubmit } = useForm();
  const [step, setStep] = useState(0);
  const { dispatch, state } = useContext(RecipesContext);
  const { state: ingredientsState } = useContext(IngredientsContext);
  const [ingredientsAndQuantity, setIngredientsAndQuantity] = useState([]);
  const [recipeSteps, setRecipeSteps] = useState([{}]);
  const navigate = useNavigate();

  const { ingredients } = ingredientsState;

  const submitRecipe = (data) => {
    if (step === 2) {
      const arrayDuplicates = [...ingredientsAndQuantity];

      updateRecipe(
        {
          ingredients: removeIngredientsDuplicates(arrayDuplicates),
          steps: recipeSteps,
        },
        dispatch,
        navigate,
        state.recipeId
      );
      return;
    }
    if (!step) {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      formData.append("img", imageRef.current.files[0]);
      createRecipe(formData, dispatch, setStep);
    }
    if (step) {
      setStep(step + 1);
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      submit={submitRecipe}
      register={register}
      buttonText={step < 2 ? "Siguiente" : "Enviar"}
    >
      <h2>Nueva Receta</h2>
      <p>Crea una nueva receta</p>
      {!step && (
        <Step0
          register={register}
          image={image}
          setImage={setImage}
          imageRef={imageRef}
        />
      )}
      {step === 1 && (
        <Step1
          ingredients={ingredients}
          ingredientsSelected={ingredientsSelected}
        />
      )}
      {step === 2 && (
        <Step2
          recipeSteps={recipeSteps}
          setRecipeSteps={setRecipeSteps}
          ingredientsSelected={ingredientsSelected}
          setIngredientsAndQuantity={setIngredientsAndQuantity}
          ingredientsAndQuantity={ingredientsAndQuantity}
        />
      )}
    </Form>
  );
};

export default CreateRecipe;
