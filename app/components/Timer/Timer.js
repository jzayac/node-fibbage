import React, { PropTypes } from 'react';

const Timer = ({ time }) => {
  return (
    <div>
      <span>{time}</span>
    </div>
  );
};

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};

export default Timer;
