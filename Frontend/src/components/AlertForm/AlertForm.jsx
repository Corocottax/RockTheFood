import Alert from "../Alert/Alert";

const AlertForm = ({ errors }) => {
  return (
    <>
      {Object.keys(errors).length > 0 && (
        <Alert>{errors[Object.keys(errors)[0]].message}</Alert>
      )}
    </>
  );
};

export default AlertForm;
