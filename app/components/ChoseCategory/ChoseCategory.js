import React, { Component, PropTypes } from 'react';
import { Button, Alert } from 'react-bootstrap';
// import styles from './Room.css';
import { connect } from 'react-redux';

@connect(
  state => ({
    players: state.room.players,
    user: state.auth.user,
    round: state.room.round,
  })
)
export default class ChoseCategory extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
    round: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
  }

// TODO: roond should be array of objects
  componentWillMount() {
    const { socket, players, round, user } = this.props;
    const idx = Math.floor(round.length / players.length);
    const playerChoosing = players[idx].name === user.name;
    if (playerChoosing) {
      socket.emit('get category');
    }
    socket.on('choose category update', (data) => {
      console.log('chose CATEGORY');
      console.log(data);
    });
    // socket.on('choose category update', (update) => {
    //
    // });
  }

  choseCategoryHandler = () => {
    console.log('chosed category');
  }

  render() {
    const { round, players, user } = this.props;
    const idx = Math.floor(round.length / players.length);
    const playerChoosing = players[idx].name === user.name;
    return (
      <div>
        <h3>choose category</h3>
        {playerChoosing && (
          <span>CHOOSING</span>
        )}
        {!playerChoosing && (
          <span>player choosing category {players[idx].name}</span>
        )}
      </div>
    );
  }
}
