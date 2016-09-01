import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import { Rooms } from '../../components';


@connect(
  state => ({
    user: state.auth.user,
    room: state.room.data,
  })
)
export default class Board extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  render() {
    const { user, params } = this.props;
    console.log('----------------id-------------');
    console.log(params);
    return (
      <div>
        <Helmet title="room" />
        <h2>ROOM</h2>
        <p>{user.name}</p>
      </div>
    );
  }
}
