import React, { useState, useRef } from 'react';
import TimerButton from './TimerButton';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function App() {
  const buttonRef = useRef();
  const [listItems, setListItems] = useState([]);
  const [active, setActive] = useState(null);

  function addItem(item) {
    setListItems([...listItems, item]);
  }

  function onItemPress(item) {
    const index = listItems.indexOf(item);
    const newList = listItems.slice(0, index + 1);
    setListItems(newList);
    setActive(index);
    buttonRef.current.pauseTimer(listItems[index]);
  }

  return (
    <div className="App">
      <TimerButton ref={buttonRef} addItem={item => addItem(item)} />
      <TransitionGroup className="items">
        {listItems.map((item, index) => (
          <CSSTransition key={item.ms} timeout={500} classNames="item">
            <div>
              <button
                className={`item-enter__btn ${active === index && 'active'} `}
                onClick={() => onItemPress(item)}
              >
                {item.formattedTime}
              </button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
