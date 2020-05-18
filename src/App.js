import React, { useState, useEffect } from "react";

const MODES = {
  RUNNING: "Running",
  STOPPED: "Stopped",
  PAUSED: "Paused",
};

const PERIOD = 1000;
const INITIAL_TIME = 0;

const Ranger = ({ val, setVal, children }) => {
  return (
    <>
      <ControlButton onClick={() => setVal((_val) => _val + 1)}>
        +
      </ControlButton>
      {val} {children}
      <ControlButton onClick={() => setVal((_val) => _val - 1)}>
        -
      </ControlButton>
    </>
  );
};

const ControlButton = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

export const App = () => {
  const [mode, setMode] = useState(MODES.STOPPED);
  const [seconds, setSeconds] = useState(INITIAL_TIME);
  const [cycles, setCycles] = useState(0);
  const [workPeriod, setWorkPeriod] = useState(0);
  const [restPeriod, setRestPeriod] = useState(0);

  useEffect(() => {
    if (mode !== MODES.RUNNING) {
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((seconds) => seconds + 1);
    }, PERIOD);

    return () => clearTimeout(timer);
  }, [seconds, mode]);

  if (mode === MODES.STOPPED) {
    return (
      <>
        <Ranger val={cycles} setVal={setCycles}>
          Cycles
        </Ranger>
        <Ranger val={workPeriod} setVal={setWorkPeriod}>
          Work Period
        </Ranger>
        <Ranger val={restPeriod} setVal={setRestPeriod}>
          Rest Period
        </Ranger>
        <ControlButton onClick={() => setMode(MODES.RUNNING)}>
          Start
        </ControlButton>
      </>
    );
  }

  if (mode === MODES.PAUSED) {
    return (
      <>
        <ControlButton onClick={() => setMode(MODES.RUNNING)}>
          Start
        </ControlButton>
        <ControlButton
          onClick={() => setMode(MODES.STOPPED) || setSeconds(INITIAL_TIME)}
        >
          Stop
        </ControlButton>
      </>
    );
  }

  return (
    <>
      <div>
        <h1>RUNNING: {seconds}</h1>
        <ControlButton onClick={() => setMode(MODES.PAUSED)}>
          Pause
        </ControlButton>
      </div>
    </>
  );
};
