import React, { forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useStopwatch } from '../../hooks/useStopwatch';

const TimerButton = forwardRef((props, ref) => {
  const { ms, setMs, start, pause, stop, running } = useStopwatch();

  useImperativeHandle(ref, () => ({
    pauseTimer(t) {
      setMs(t.ms);
      pause();
    }
  }));

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

  const onReset = () => {
    stop();
    props.removeItems();
  };

  return (
    <div className="buttons-wrap">
      <button
        className="timer-btn"
        onClick={() => (running ? addNewItem(ms) : start())}
      >
        {ms
          ? `${hours} : ${minutes} : ${seconds} : ${centiseconds}`
          : 'Start timer'}
      </button>
      <button className="reset-btn" onClick={onReset}>
        Reset
      </button>
    </div>
  );
});

export default TimerButton;

TimerButton.propTypes = {
  addItem: PropTypes.func,
  removeItems: PropTypes.func
};
