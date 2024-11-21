import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { RecipesContext } from "../../providers/RecipesProvider";
import {
  filterRecipes,
  getRecipes,
} from "../../reducers/recipes/recipes.actions";
import Recipe from "../../components/Recipe/Recipe";
import FieldForm from "../../components/FieldForm/FieldForm";
import Form from "../../components/Form/Form";
import { useForm } from "react-hook-form";
import { UsersContext } from "../../providers/UsersProvider";

const Home = () => {
  const { state } = useContext(UsersContext);
  const { user } = state;
  const { state: recipesState, dispatch } = useContext(RecipesContext);
  const { register, handleSubmit } = useForm();
  const [time, setTime] = useState("");
  const [checked, setChecked] = useState(false);

  const { recipes } = recipesState;

  useEffect(() => {
    getRecipes(dispatch);
  }, []);

  const submit = (data) => {
    data.time = time;
    data.orderByLikes = checked;
    filterRecipes(dispatch, data);
  };

  return (
    <div className="home">
      {user?.rol === "admin" && (
        <Link to="/admin-dashboard" className="link-admin">
          <Button>Panel de administración</Button>
        </Link>
      )}
      <section className="filters">
        <Form
          register={register}
          handleSubmit={handleSubmit}
          submit={submit}
          buttonText="Filtrar"
        >
          <h2>Buscar Recetas</h2>
          <FieldForm
            ph="Spaguettis"
            registerName="title"
            label="Nombre de la receta"
          />
          <div className="properties">
            <div>
              <label>Dificultad</label>
              <select {...register("difficulty")}>
                <option></option>
                <option>Baja</option>
                <option>Media</option>
                <option>Alta</option>
              </select>
            </div>
            <div className="time">
              <label>Duración</label>
              <div>
                <Button
                  onClick={() => setTime(time > 5 ? time - 5 : 5)}
                  type="button"
                >
                  _
                </Button>
                <input disabled value={time} />

                <Button
                  onClick={() => setTime(!time ? 5 : time + 5)}
                  type="button"
                >
                  +
                </Button>
              </div>
            </div>
              <div className="order-likes">
                <Button
                  onClick={() => setChecked(!checked)}
                  invert={!checked}
                >
                  Ordenar por likes
                </Button>
            </div>
          </div>
        </Form>
      </section>
      <section className="recipes">
        <h2>Recetas</h2>
        <div>
          {recipes.map((recipe) => (
            <Recipe recipe={recipe} key={recipe._id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
