import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import FieldForm from "../FieldForm/FieldForm";
import "./Register.css";
import Form from "../Form/Form";
import { useForm } from "react-hook-form";
import { registerUser } from "../../reducers/users/users.actions";
import { useContext } from "react";
import AlertForm from "../AlertForm/AlertForm";
import { UsersContext } from "../../providers/UsersProvider";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { dispatch } = useContext(UsersContext);
  const navigate = useNavigate();

  return (
    <Form
      handleSubmit={handleSubmit}
      submit={(data) => registerUser(data, dispatch, navigate)}
      register={register}
      buttonText="Registrarse"
    >
      <h2>Registrarse</h2>
      <p>Crea una cuenta nueva</p>
      <AlertForm errors={errors}/>
      <FieldForm
        label="Nombre"
        ph="Tu nombre"
        registerName="name"
        validations={{
          required: { value: true, message: "El nombre es requerido" },
          maxLength: {
            value: 30,
            message: "El nombre de usuario es demasiado largo",
          },
        }}
      />
      <FieldForm
        label="Correo electrónico"
        ph="tu@email.com"
        registerName="email"
        validations={{
          required: { value: true, message: "El email es requerido" },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Debes introducir un formato de email correcto",
          },
        }}
      />
      <FieldForm
        label="Contraseña"
        ph="*********"
        type="password"
        registerName="password"
        validations={{
          required: { value: true, message: "La contraseña es requerida" },
        }}
      />
      <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
    </Form>
  );
};

export default Register;
