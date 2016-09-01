import React, { Component, PropTypes } from 'react';
import styles from './App.css';
import { connect } from 'react-redux';
import mainSocketEvents from '../../socket/mainEvents';
import config from '../../../config/config';
import io from 'socket.io-client';
import { push } from 'react-router-redux';

let socket;

@connect(
  state => ({
    user: state.auth.user,
  }),
  { pushState: push })
export default class App extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object,
    children: React.PropTypes.element.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      socket = io('', { path: '/ws' });
      mainSocketEvents(socket);
      if (!config.isProduction) {
        socket.on('data', (data) => {
          console.log('data: ' + data);
        });
        global.socket = socket;
      }

      this.props.pushState('/board');
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={`${styles.content} container`} >
          {React.cloneElement(this.props.children, { socket: socket })}
        </div>
      </div>
    );
  }
}
