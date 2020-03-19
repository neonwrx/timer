import { useState, useEffect, useRef } from 'react';

export const useStopwatch = () => {
  const [started, setStarted] = useState(false);
  const [ms, setMs] = useState(0);

  const intervalRef = useRef();

  useEffect(() => {
    if (started) {
      const startTime = Date.now() - ms;
      const id = setInterval(() => {
        setMs(Date.now() - startTime);
      }, 16);
      intervalRef.current = id;
    }
    return () => clearInterval(intervalRef.current);
  });

  return {
    ms,
    running: started,
    setMs: val => setMs(val),
    start: () => setStarted(true),
    pause: () => setStarted(false),
    stop: () => {
      setMs(0);
      setStarted(false);
    }
  };
};
