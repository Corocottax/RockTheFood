import "./IngredientsDescription.css";

const IngredientsDescription = ({ ingredients }) => {
  return (
    <div className="ingredients_description">
      {ingredients.map((ig) => {
        return (
          <div key={ig._id}>
            <div>
              <img src={ig.ingredient.logo} alt={ig.ingredient.name} />
              <p>{ig.ingredient.name}</p>
            </div>
            <p>{ig.quantity}</p>
          </div>
        );
      })}
    </div>
  );
};

export default IngredientsDescription;
