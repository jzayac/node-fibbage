import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { WaitOthers, ChoseCategory } from '../../components';
import { updateRoom } from '../../redux/modules/room';

@connect(
  state => ({
    user: state.auth.user,
    room: state.room,
  }),
  { updateRoom }
)
export default class Room extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired,
    updateRoom: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.socket.on('start game', (data) => {
      this.props.updateRoom(data);
    });
  }

  componentWillUnmount() {
    this.props.socket.removeAllListeners('start game');
  }

  startGame = () => {
    const { socket, params } = this.props;
    socket.emit('start game', params.roomId);
  }

  render() {
    const { params, socket, room } = this.props;
    return (
      <div>
        <Helmet title={`room: ${params.roomId}`} />
        {!room.playing && (
          <WaitOthers socket={socket} roomName={params.roomId} startGameHandler={this.startGame} />
        )}
        {room.playing && (
          <div>
            <ChoseCategory socket={socket} />
          </div>
        )}
      </div>
    );
  }
}
