import { useState } from "react";
import "./ToggleInfo.css";

const ToggleInfo = ({ C1, C2 }) => {
  const [show1, setShow1] = useState(true);

  return (
    <>
      <div className="toggle">
        <button
          className={show1 ? "active" : ""}
          onClick={() => setShow1(true)}
        >
          {C1.reference}
        </button>
        <button
          className={!show1 ? "active" : ""}
          onClick={() => setShow1(false)}
        >
          {C2.reference}
        </button>
      </div>
      {show1 ? C1.Component : C2.Component}
    </>
  );
};

export default ToggleInfo;
