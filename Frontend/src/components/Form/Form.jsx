import { createContext } from "react";
import "./Form.css";
import Button from "../Button/Button";

export const FormContext = createContext();

const Form = ({
  children,
  handleSubmit,
  submit,
  register,
  buttonText = "Enviar",
}) => {
  return (
    <form className="form" onSubmit={handleSubmit(submit)}>
      <FormContext.Provider value={{ register }}>
        {children}
      </FormContext.Provider>
      <Button>{buttonText}</Button>
    </form>
  );
};

export default Form;
