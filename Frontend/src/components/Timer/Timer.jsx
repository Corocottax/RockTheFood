import { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./Timer.css";

const Timer = ({ step }) => {
  const [timer, setTimer] = useState(Number(step.time) * 60000);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    let interval;

    if (!paused) {
      interval = setInterval(() => {
        setTimer((prevTimer) => Math.max(prevTimer - 1000, 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="timer">
      <p>{step.description}</p>
      <div>
        <p>
          ⏱ {Math.floor(timer / 60000)}: {Math.floor((timer % 60000) / 1000)}{" "}
          min
        </p>
        <Button onClick={() => setPaused(!paused)}>
          {paused ? "Iniciar" : "Pausar"}
        </Button>
      </div>
    </div>
  );
};

export default Timer;
