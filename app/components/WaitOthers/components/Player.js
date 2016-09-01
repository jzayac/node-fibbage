import React, { PropTypes } from 'react' ;

const Player = ({ name, ready, owner }) => {
  return (
    <div>
      {name}{ready}{owner}
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
