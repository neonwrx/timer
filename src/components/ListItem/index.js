import React from 'react';
import PropTypes from 'prop-types';

export default function ListItem(props) {
  return (
    <div>
      <button
        className={`item-enter__btn ${props.active && 'active'} `}
        onClick={() => props.onItemPress(props.item)}
      >
        {props.item.formattedTime}
      </button>
    </div>
  );
}

ListItem.propTypes = {
  active: PropTypes.bool,
  onItemPress: PropTypes.func,
  item: PropTypes.object
};
