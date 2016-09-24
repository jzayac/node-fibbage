import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import styles from './WaitOthers.css';
import * as roomActions from '../../redux/modules/room';
import Player from './components/Player';
// import _ from 'lodash';

@connect(
  state => ({
    user: state.auth.user,
    // room: state.room.data,
    roomName: state.room.name,
    roomPlayers: state.room.players,
    roomPlayersReady: state.room.ready,
  }),
  roomActions)
export default class WaitOthers extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    joinRoom: PropTypes.func.isRequired,
    playerReady: PropTypes.func.isRequired,
    roomName: PropTypes.string.isRequired,
    roomPlayers: PropTypes.array.isRequired,
    startGameHandler: PropTypes.func.isRequired,
    roomPlayersReady: PropTypes.array.isRequired,
    updateRoom: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { socket, roomName, user } = this.props;
    if (user.room !== roomName) {
      socket.emit('join room', roomName, user.name);
      this.props.joinRoom({ name: user.name });
    }
    // socket.on('player join room', (player) => {
    //   this.props.joinRoom(player);
    // });
    socket.on('wait for others update', (update) => {
      this.props.updateRoom(update);
    });
    // socket.on('new player ready', (player) => {
    //   this.props.playerReady(player);
    // });
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.removeAllListeners('playre join room');
    socket.removeAllListeners('new player ready');
    socket.removeAllListeners('wait for others update');
  }

  playerReadyHandler = () => {
    const { socket, user, roomName, roomPlayersReady } = this.props;
    const playerReady = roomPlayersReady.find((name) => name === user.name);
    if (playerReady) {
      // TODO: implement this shit

    } else {
      socket.emit('player ready', user.name, roomName);
      this.props.playerReady(user.name);
    }
  }

  isReady = (name) => {
    const { roomPlayersReady } = this.props;
    let ready = false;
    roomPlayersReady.map((i) => {
      if (i === name) {
        ready = true;
      }
      return i;
    });
    return ready;
  }
  startGameHandler = () => {
    const { socket, roomName } = this.props;
    socket.emit('ready to play', roomName);
    // TODO: implement
  }

  render() {
    const { roomPlayers, roomPlayersReady, user } = this.props;
    const canPlay = roomPlayers.length >= 1 && roomPlayers.length === roomPlayersReady.length;
    const isFirst = roomPlayers[0] && roomPlayers[0].name === user.name;
    const playerReady = roomPlayersReady.find((name) => name === user.name);
    return (
      <div>
        <h2>more test</h2>
        {roomPlayers.map((player, key) => (
          <Player key={key} name={player.name} ready={this.isReady(player.name)} />
        ))}
        <Button
          className="btn btn-primary"
          onClick={() => this.playerReadyHandler()}
        ><i className="fa fa-sign-in" />{!playerReady ? 'ready' : 'cancel'}
        </Button>
        {isFirst && (
          <Button
            className="btn btn-primary"
            onClick={() => this.startGameHandler()}
            disabled={!canPlay}
          ><i className="fa fa-sign-in" />{canPlay ? 'start game' : 'waiting for others'}
          </Button>
        )}
      </div>
    );
  }
}
