import { useForm } from "react-hook-form";
import FieldForm from "../FieldForm/FieldForm";
import Form from "../Form/Form";
import "./CreateIngredient.css";
import AlertForm from "../AlertForm/AlertForm";
import { useContext, useEffect, useRef, useState } from "react";
import {
  createIngredient,
  getIngredients,
} from "../../reducers/ingredients/ingredients.actions";
import { IngredientsContext } from "../../providers/IngredientsProvider";
import Button from "../Button/Button";
import { toggleCheckboxFamily } from "../../utils/functions/toggleAllergens";
import { allergensImgs } from "../../utils/data/allergensImgs";
import UploadImage from "../UploadImage/UploadImage";

const allergensSelected = [];

const CreateIngredient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const [image, setImage] = useState();
  const [openned, setOpenned] = useState(false);
  const imageRef = useRef();

  const { state, dispatch } = useContext(IngredientsContext);
  const { ingredients } = state;

  useEffect(() => {
    if (!ingredients.length) {
      getIngredients(dispatch);
    }
  }, []);

  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        submit={(data) =>
          createIngredient(
            data,
            image,
            setError,
            imageRef,
            reset,
            setImage,
            dispatch,
            setOpenned,
            allergensSelected
          )
        }
        register={register}
      >
        <Button width="auto" type="button" onClick={() => setOpenned(true)}>
          Ver ingredientes
        </Button>
        <h2>Nuevo Ingrediente</h2>
        <p>Añade un nuevo ingrediente a la base de datos</p>
        <AlertForm errors={errors} />
        <FieldForm
          label="Nombre del ingrediente"
          ph="Ej: Harina"
          registerName="name"
          validations={{
            required: {
              value: true,
              message: "El nombre del ingrediente es requerido",
            },
          }}
        />
        <div className="allergens">
          <label>Elige los alérgenos</label>
          <div>
            {Object.keys(allergensImgs).map((allergen) => (
              <div key={allergen}>
                <input
                  type="checkbox"
                  onClick={(e) =>
                    toggleCheckboxFamily(e, allergen, allergensSelected)
                  }
                />
                <p>{allergen}</p>
              </div>
            ))}
          </div>
        </div>
        <UploadImage setImage={setImage} imageRef={imageRef} image={image} />
      </Form>

      {openned && (
        <div className="modal" onClick={(e) => setOpenned(false)}>
          <div>
            {ingredients.map((ingredient) => (
              <div key={ingredient._id}>
                <img src={ingredient.logo} />
                <p>{ingredient.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateIngredient;
