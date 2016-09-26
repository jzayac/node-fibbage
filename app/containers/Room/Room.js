import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { WaitOthers, ChoseCategory, Question } from '../../components';
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

  componentDidMount() {
  // componentWillMount() {
    this.props.socket.on('start game', (data) => {
      this.props.updateRoom(data);
    });
    this.props.socket.on('room update', (data) => {
      console.log('=========UPDATE----------');
      console.log(data);
      this.props.updateRoom(data);
    });
  }

  componentWillUnmount() {
    this.props.socket.removeAllListeners('start game');
  }

  startGame = () => {
    const { socket, params } = this.props;
    console.log('starting');
    socket.emit('start game', params.roomId);
  }

  render() {
    const { params, socket, room } = this.props;
    // const chooseCategory = room.round.length === 0 && room.round[room.round.length -1].question;
    const categoryChoosing = room.round.length === 0 || !room.round[room.round.length -1].question;
    // const
    console.log('chose category?????');
    console.log(categoryChoosing);
    return (
      <div>
        <Helmet title={`room: ${params.roomId}`} />
        {!room.playing && (
          <WaitOthers socket={socket} roomName={params.roomId} startGameHandler={this.startGame} />
        )}
        {room.playing && (
          <div>
            {categoryChoosing && (
              <ChoseCategory socket={socket} />
            )}
            {!categoryChoosing && (
              <Question socket={socket} />
            )}
          </div>
        )}
      </div>
    );
  }
}
