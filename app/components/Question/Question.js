import React, { Component, PropTypes } from 'react';
// import { Button, Alert } from 'react-bootstrap';
// import styles from './Room.css';
import { connect } from 'react-redux';
// import api from '../../api';

@connect(
  state => ({
    players: state.room.players,
    user: state.auth.user,
    round: state.room.round,
    roomName: state.room.name,
  })
)
export default class Question extends Component {
  static propTypes = {
    round: PropTypes.array.isRequired,
  }

  render() {
    const { round } = this.props;
    const question = round[round.length - 1].question;
    return (
      <div>
        <h3>question</h3>
        <p>{question.question}</p>
      </div>
    );
  }
}
