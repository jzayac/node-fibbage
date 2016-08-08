import React, { Component, PropTypes } from 'react';
import styles from './App.css';
import { connect } from 'react-redux';
import { logout } from '../../redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
  }),
  { logout })
export default class App extends Component {
  static propTypes = {
    logout: PropTypes.func,
    user: PropTypes.object,
    children: React.PropTypes.element.isRequired,
  }
  handleAlertDismiss = () => {
    this.setState({ alertVisible: false });
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={`${styles.content} container`} >
          {this.props.children}
        </div>
      </div>
    );
  }
}
