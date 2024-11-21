import Timer from "../Timer/Timer";
import "./StepsDescription.css";

const StepsDescription = ({ steps }) => {
  return (
    <div>
      {steps.map((step) => (
        <Timer step={step} />
      ))}
    </div>
  );
};

export default StepsDescription;
