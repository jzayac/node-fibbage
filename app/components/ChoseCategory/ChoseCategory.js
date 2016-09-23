import React, { Component, PropTypes } from 'react';
import { Button, Alert } from 'react-bootstrap';
// import styles from './Room.css';
import { connect } from 'react-redux';

@connect(
  state => ({
    players: state.room.players,
  })
)
export default class ChoseCategory extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
  }
  render() {
    return (
      <div>
        <h3>choose category</h3>
      </div>
    );
  }
}
