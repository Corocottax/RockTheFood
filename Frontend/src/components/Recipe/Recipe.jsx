import { useContext } from "react";
import { allergensImgs } from "../../utils/data/allergensImgs";
import Button from "../Button/Button";
import "./Recipe.css";
import { RecipesContext } from "../../providers/RecipesProvider";
import { toggleLike } from "../../reducers/recipes/recipes.actions";
import { Link } from "react-router-dom";
import { UsersContext } from "../../providers/UsersProvider";

const Recipe = ({ recipe }) => {
  const { state: recipesState, dispatch } = useContext(RecipesContext);
  const { state } = useContext(UsersContext);
  const { user } = state;
  const { recipes } = recipesState;

  return (
    <article className="recipe">
      <div
        className="like"
        onClick={() =>
          toggleLike(
            recipe._id,
            dispatch,
            user._id,
            !recipe?.likes?.includes(user?._id),
            recipes
          )
        }
      >
        {
          <p
            style={{
              color: recipe?.likes?.includes(user?._id) ? "white" : "black",
            }}
          >
            {recipe.likes.length}
          </p>
        }
        {recipe?.likes?.includes(user?._id) ? (
          <img src="/icons/corazon-relleno.png" className="heart" />
        ) : (
          <img src="/icons/corazon-vacio.png" className="heart" />
        )}
      </div>

      <div className="img">
        <img src={recipe.img} />
      </div>
      <div className="info">
        <h3>{recipe.title}</h3>
        <div>
          <p>Dificultad: {recipe.difficulty}</p>
          <p>⏱ {recipe.time} min</p>
        </div>
      </div>
      <div className="allergens">
        <div>
          {recipe.allergens.map((allergen) => (
            <img
              src={allergensImgs[allergen].src}
              alt={allergensImgs[allergen].alt}
              title={allergen}
              key={allergen}
            />
          ))}
        </div>
        <Button width="auto">
          <Link to={`/recipe/${recipe._id}`}>Ver Receta</Link>
        </Button>
      </div>
    </article>
  );
};

export default Recipe;
