import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import FieldForm from "../FieldForm/FieldForm";
import Button from "../Button/Button";
import Form from "../Form/Form";
import { login } from "../../reducers/users/users.actions";
import { useContext, useEffect } from "react";
import AlertForm from "../AlertForm/AlertForm";
import { UsersContext } from "../../providers/UsersProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError, 
    formState: { errors },
  } = useForm();
  const { state, dispatch } = useContext(UsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.error) {
      setError("apierror", { message: state.error });
    }
  }, [state.error]);

  return (
    <Form
      handleSubmit={handleSubmit}
      submit={(data) => login(data, dispatch, navigate)}
      register={register}
      buttonText="Login"
    >
      <h2>Iniciar Sesión</h2>
      <p>Ingresa a tu cuenta</p>
      <AlertForm errors={errors} />
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
          required: { value: true, message: "Introduce la contraseña" },
        }}
      />
      <Link to="/register">¿No tienes cuenta? Regístrate</Link>
    </Form>
  );
};

export default Login;
