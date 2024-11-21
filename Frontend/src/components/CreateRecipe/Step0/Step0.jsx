import FieldForm from "../../FieldForm/FieldForm";
import UploadImage from "../../UploadImage/UploadImage";
import "./Step0.css";

const Step0 = ({ register, image, setImage, imageRef }) => {
  return (
    <>
      <FieldForm
        label="Nombre de la receta"
        ph="Ej: Macedonia"
        registerName="title"
      />
      <div className="info_recipe_time_difficulty">
        <div className="select_fieldform">
          <label>Escoge la dificultad</label>
          <select
            {...register("difficulty", {
              required: { value: true, message: "Escoge una dificultad" },
            })}
          >
            <option></option>
            <option>Baja</option>
            <option>Media</option>
            <option>Alta</option>
          </select>
        </div>
        <FieldForm
          label="Duración"
          registerName="time"
          type="number"
          ph="5 min"
        />
      </div>
      <UploadImage image={image} setImage={setImage} imageRef={imageRef} />
      <input id="image" type="file" style={{ display: "none" }} />
    </>
  );
};

export default Step0;
