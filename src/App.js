import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Start or stop the stopwatch
  const toggle = () => {
    setIsActive(!isActive);
  };

  // Reset the stopwatch
  const reset = () => {
    setTime(0);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000); // Update every second
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-1);

    return `${getMinutes} : ${getSeconds}`;
  };

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <p>Time: {formatTime(time)}</p>
      <div>
        <button onClick={toggle}>{isActive ? "Pause" : "Start"}</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
