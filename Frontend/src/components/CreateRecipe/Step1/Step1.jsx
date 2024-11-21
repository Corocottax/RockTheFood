import { toggleCheckboxFamily } from "../../../utils/functions/toggleAllergens";
import "./Step1.css";

const Step1 = ({ ingredients, ingredientsSelected }) => {
  return (
    <>
      <div className="ingredient_select">
        <label>Elige los ingredientes</label>
        <div>
          {ingredients.map((ingredient) => (
            <div key={ingredient._id}>
              <input
                type="checkbox"
                id={ingredient._id}
                onChange={(e) => {
                  toggleCheckboxFamily(e, ingredient, ingredientsSelected);
                }}
              />
              <label htmlFor={ingredient._id}>
                <img src={ingredient.logo} alt={ingredient.name} />
                <p>{ingredient.name}</p>
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Step1;
