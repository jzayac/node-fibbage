import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import io from 'socket.io-client';
import config from '../../../config/config';
import mainSocketEvents from '../../socket/mainEvents';

let socket;

@connect(
  state => ({
    user: state.auth.user,
  })
)
export default class Board extends Component {
  static propTypes = {
    user: PropTypes.object,
  }
  componentWillMount() {
    socket = io('', { path: '/ws' });
    mainSocketEvents(socket);
    if (!config.isProduction) {
      socket.on('data', (data) => {
        console.log('data: ' + data);
      });
      global.socket = socket;
    }
    socket.emit('authorization', this.props.user);
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        <Helmet title="board" />
        <h2>board</h2>
      </div>
    );
  }
}
