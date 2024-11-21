import { useContext, useEffect } from "react";
import "./RecipeDetail.css";
import { useParams } from "react-router-dom";
import { RecipesContext } from "../../providers/RecipesProvider";
import ToggleInfo from "../../components/ToggleInfo/ToggleInfo";
import IngredientsDescription from "../../components/IngredientsDescription/IngredientsDescription";
import StepsDescription from "../../components/StepsDescription/StepsDescription";
import { getRecipe } from "../../reducers/recipes/recipes.actions";

const RecipeDetail = () => {
  const { id } = useParams();
  const {
    dispatch,
    state: { recipe, loading },
  } = useContext(RecipesContext);

  useEffect(() => {
    getRecipe(dispatch, id);
  }, []);

  return (
    <div className="div_recipe_detail">
      <section className="recipe_detail">
        {recipe && (
          <>
            <h2>{recipe?.title}</h2>
            <p>⏱ {recipe?.time} min</p>
            <ToggleInfo
              C1={{
                reference: "Ingredientes",
                Component: (
                  <IngredientsDescription ingredients={recipe?.ingredients} />
                ),
              }}
              C2={{
                reference: "Pasos a seguir",
                Component: <StepsDescription steps={recipe?.steps} />,
              }}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default RecipeDetail;
