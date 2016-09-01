import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import styles from './WaitOthers.css';
import * as roomActions from '../../redux/modules/room';
import Player from './components/Player';

@connect(
  state => ({
    user: state.auth.user,
    // room: state.room.data,
    roomName: state.room.name,
    roomPlayers: state.room.players,
  }),
  roomActions)
export default class WaitOthers extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    // room: PropTypes.object.isRequired,
    joinRoom: PropTypes.func.isRequired,
    roomName: PropTypes.string.isRequired,
    roomPlayers: PropTypes.array.isRequired,
  }

  componentWillMount() {
    const { socket, roomName, user } = this.props;
    if (user.room !== roomName) {
      socket.emit('join room', roomName, user.name);
      this.props.joinRoom(user.name);
    }
    socket.on('player join room', (player) => {
      this.props.joinRoom(player);
    });
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.removeAllListeners('playre join room');
  }

  render() {
    const { roomPlayers } = this.props;
    return (
      <div>
        <h2>more test</h2>
        {roomPlayers.map((player, key) => (
          <Player key={key} name={player} ready={false} />
        ))}
      </div>
    );
  }
}
