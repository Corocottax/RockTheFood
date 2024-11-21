import Button from "../../Button/Button";
import "./Step2.css";

const Step2 = ({
  recipeSteps,
  setRecipeSteps,
  ingredientsSelected,
  setIngredientsAndQuantity,
  ingredientsAndQuantity
}) => {
  const addStepToRecipe = (key, value, index) => {
    const arrayRecipeSteps = [...recipeSteps];
    arrayRecipeSteps[index][key] = value;
    setRecipeSteps([...arrayRecipeSteps]);
  };

  return (
    <>
      <div className="ingredients_selected">
        <label>Elige las cantidades</label>
        <div>
          {ingredientsSelected.map((ingredient) => (
            <div key={ingredient._id}>
              <div>
                <img src={ingredient.logo} alt={ingredient.name} />
                <h3>{ingredient.name}</h3>
              </div>
              <input
                placeholder="L / gr / U"
                required
                onBlur={(e) =>
                  setIngredientsAndQuantity([
                    ...ingredientsAndQuantity,
                    {
                      ingredient: ingredient._id,
                      quantity: e.target.value,
                    },
                  ])
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="steps">
        <label>Determina los pasos de la receta</label>
        {recipeSteps.map((recipeStep, index) => (
          <div key={index}>
            <textarea
              placeholder="Escribe la descripción de tu paso..."
              onChange={(e) =>
                addStepToRecipe("description", e.target.value, index)
              }
              required
            />
            <input
              type="number"
              placeholder="25 min"
              onChange={(e) => addStepToRecipe("time", e.target.value, index)}
              required
            />
          </div>
        ))}
        <div>
          <Button
            width="35px"
            type="button"
            onClick={() => setRecipeSteps([...recipeSteps, {}])}
          >
            +
          </Button>
          <Button
            width="35px"
            type="button"
            onClick={() => {
              const arrayRecipeStepsCopy = [...recipeSteps];
              arrayRecipeStepsCopy.length > 1 && arrayRecipeStepsCopy.pop();
              setRecipeSteps([...arrayRecipeStepsCopy]);
            }}
          >
            -
          </Button>
        </div>
      </div>
    </>
  );
};

export default Step2;
