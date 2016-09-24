import React, { PropTypes } from 'react' ;

const Player = ({ name, ready, owner }) => {
  const readyStyles = ready ? { color: 'green' } : {};
  return (
    <div>
      <span style={readyStyles}>{name}{owner}</span>
    </div>
  );
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
  owner: PropTypes.bool.isRequired,
};

Player.defaultProps = {
  owner: false,
};

export default Player;
