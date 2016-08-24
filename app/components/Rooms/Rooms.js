import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import styles from './Rooms.css';
import { connect } from 'react-redux';
import * as channelActions from '../../redux/modules/channel';
// import { Link } from 'react-router';

@connect(
  state => ({
    channels: state.channel.channels,
    users: state.channel.users,
    user: state.auth.user.name,
  }),
  channelActions,
)
export default class Rooms extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    channels: PropTypes.array.isRequired,
    users: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    createRoom: PropTypes.func.isRequired,
    joinRoom: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      newRoom: false,
    };
  }

  createNewRoom = (e) => {
    e.preventDefault();
    // console.log(this.refs.roomName.value);
    const channelName = this.refs.roomName.value;
    this.props.createRoom(channelName);
    this.props.socket.emit('create channel', channelName);
    this.setState({ newRoom: false });
  }

  joinRoom = (e, name) => {
    e.preventDefault();
    this.props.joinRoom(name, this.props.user);
    // socket emit user join
  }

  render() {
    const { channels } = this.props;
    const { newRoom } = this.state;
    const activeRooms = channels.length;
    return (
      <div>
        <Button
            className="btn btn-primary"
            onClick={() => this.setState({ newRoom: !newRoom })}
        ><i className="fa fa-sign-in" />{newRoom ? 'close' : 'new room'}
        </Button>
        {newRoom && (
          <form onSubmit={(e) => {this.createNewRoom(e)}}>
            <input
              type="text" ref="roomName" placeholder="room name"
              className={`${styles.widthFull} form-control`}
            />
          </form>
        )}
        {channels && channels.map((name, key) =>
          <div key={key}>
            <p key={key}>
              <a href="#" key={key} onClick={(e) => this.joinRoom(e, name)}>{name}</a>
            </p>
          </div>
        )}
        <span>active rooms {activeRooms}</span>
      </div>
    );
  }
}
