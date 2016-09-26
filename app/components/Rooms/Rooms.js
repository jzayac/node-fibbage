import React, { Component, PropTypes } from 'react';
import { Button, Alert } from 'react-bootstrap';
import styles from './Rooms.css';
import { connect } from 'react-redux';
import api from '../../api';
import validate from '../../../utils/validation';
import { push } from 'react-router-redux';
// import { roomInfo } from '../../redux/modules/room';
import { Link } from 'react-router';

@connect(
  state => ({
    user: state.auth.user.name,
    // room:
  }),
  // { roomInfo, pushState: push })
  { pushState: push })
export default class Rooms extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    // roomInfo: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      rooms: [],
      newRoom: false,
      error: undefined,
    };
  }
  componentDidMount() {
  // componentWillMount() {
    this.getRooms();
    const { socket } = this.props;
    socket.on('new room', (rooms) => {
      this.setState({
        rooms,
      });
    });
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.removeAllListeners('new room');
  }

  async getRooms() {
    const res = await api({
      method: 'get',
      url: '/room',
    }).then(
      (data) => data,
      (err) => err,
    );
    this.setState({
      error: res.error || undefined,
      rooms: res.data || this.state.rooms,
    });
  }

  newRoomHandler = (e) => {
    e.preventDefault();
    const roomName = this.refs.roomName.value;
    const error = validate(roomName, 'room name')
      .isRequired()
      .isString()
      .unique(this.state.rooms, 'name')
      .exec();

    const cloneRooms = this.state.rooms.slice();

    if (!error) {
      cloneRooms.push({
        name: roomName,
        players: [],
      });
      this.props.socket.emit('create room', roomName);
    }
    this.setState({
      error: error || undefined,
      rooms: cloneRooms,
      newRoom: error || false,
    });
  }

  render() {
    const { newRoom, rooms, error } = this.state;
    const activeRooms = rooms.length;
    return (
      <div>
        {error && error.map((e, key) =>
          <Alert key={key} bsStyle="danger" >
            {e}
          </Alert>
        )}
        <Button
          className="btn btn-primary"
          onClick={() => this.setState({ newRoom: !newRoom })}
        ><i className="fa fa-sign-in" />{newRoom ? 'close' : 'new room'}
        </Button>
        {newRoom && (
          <form onSubmit={(e) => { this.newRoomHandler(e); }}>
            <input
              type="text" ref="roomName" placeholder="room name"
              className={`${styles.widthFull} form-control`}
            />
          </form>
        )}
        {rooms && rooms.map((room, key) => (
          <div key={key}>
            {!room.playing && (
              <p key={key}>
                <Link to={`/board/${room.name}`} activeClassName="active">{room.name}</Link>
                <span>{' '}{room.players.length}</span>
              </p>
            )}
          </div>
        ))}
        <span>active rooms {activeRooms}</span>
      </div>
    );
  }
}
