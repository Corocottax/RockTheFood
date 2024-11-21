import "./Alert.css";

const Alert = ({ children }) => {
  return (
    <div className="alert">
      <div>
        <img src="/icons/error.png" alt="error" />
        <h3>Error</h3>
      </div>
      <p>{children}</p>
    </div>
  );
};

export default Alert;
