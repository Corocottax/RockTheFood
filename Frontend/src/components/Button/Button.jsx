import "./Button.css";

const Button = ({
  children,
  width,
  type = "submit",
  onClick = () => {},
  invert,
}) => {
  return (
    <button
      onClick={onClick}
      className={`main_button ${invert ? "invert" : ""}`}
      style={{ width: width }}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
