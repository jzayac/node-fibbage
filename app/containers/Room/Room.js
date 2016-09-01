import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { WaitOthers } from '../../components';


@connect(
  state => ({
    user: state.auth.user,
    room: state.room.data,
  })
)
export default class Room extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired,
  }

  render() {
    const { user, params, socket } = this.props;
    return (
      <div>
        <Helmet title={`room: ${params.roomId}`} />
        <WaitOthers socket={socket} roomName={params.roomId} />
      </div>
    );
  }
}
