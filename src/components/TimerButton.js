import React, { forwardRef, useImperativeHandle } from 'react';
import { useStopwatch } from '../hooks/useStopwatch';

const TimerButton = forwardRef((props, ref) => {
  const { ms, setMs, start, pause, running } = useStopwatch();

  const centiseconds = ('0' + (Math.floor(ms / 10) % 100)).slice(-2);
  const seconds = ('0' + (Math.floor(ms / 1000) % 60)).slice(-2);
  const minutes = ('0' + (Math.floor(ms / 60000) % 60)).slice(-2);
  const hours = ('0' + Math.floor(ms / 3600000)).slice(-2);

  const addNewItem = ms => {
    props.addItem({
      ms,
      formattedTime: `${hours}:${minutes}:${seconds}:${centiseconds}`
    });
  };

  useImperativeHandle(ref, () => ({
    pauseTimer(t) {
      setMs(t.ms);
      pause();
    }
  }));

  return (
    <button
      className="timer-btn ripple"
      onClick={() => (running ? addNewItem(ms) : start())}
    >
      {ms
        ? `${hours} : ${minutes} : ${seconds} : ${centiseconds}`
        : 'Start timer'}
    </button>
  );
});

export default TimerButton;
