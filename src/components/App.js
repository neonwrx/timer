import React, { useState, useRef } from 'react';
import TimerButton from './TimerButton';
import ListItem from './ListItem';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function App() {
  const buttonRef = useRef();
  const [listItems, setListItems] = useState([]);
  const [active, setActive] = useState(null);

  const addItem = item => {
    setListItems([...listItems, item]);
  };

  const removeItems = () => {
    setListItems([]);
  };

  const onItemPress = item => {
    const index = listItems.indexOf(item);
    const newList = listItems.slice(0, index + 1);
    setListItems(newList);
    setActive(index);
    buttonRef.current.pauseTimer(listItems[index]);
  };

  return (
    <div className="App">
      <h2>Test Timer</h2>
      <div className="wrapper">
        <TimerButton
          ref={buttonRef}
          addItem={item => addItem(item)}
          removeItems={removeItems}
        />
        <TransitionGroup className="items">
          {listItems.map((item, index) => (
            <CSSTransition key={item.ms} timeout={500} classNames="item">
              <ListItem
                active={active === index}
                onItemPress={onItemPress}
                item={item}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
}
