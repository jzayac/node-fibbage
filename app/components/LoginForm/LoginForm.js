import React, { Component, PropTypes } from 'react';
import { Button, Alert } from 'react-bootstrap';
import styles from './LoginForm.css';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as authActions from '../../redux/modules/auth';

// @connect(
//   state => ({
//     user: state.auth.user,
//     loginError: state.auth.loginError,
//     loggingIn: state.auth.loggingIn,
//   }),
//   authActions)
export default class LoginForm extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    loginError: PropTypes.string,
    authDismissError: PropTypes.func,
    loggingIn: PropTypes.bool,
  }
  handleUserLogin = () => {
    const user = this.refs.nick;
    socket.emit('user/login', {
      user: user.value
    });
    user.value = '';
  }

  render() {
    return (
      <div className={styles.loginForm}>
        <form
          className="login-form form-inline"
          onSubmit={(e) => { e.preventDefault(); this.handleUserLogin(); }}
        >
          <h2>enter your nick name</h2>
          <input
            type="text" ref="nick" placeholder="enter nick name"
            className={`${styles.widthFull} form-control`}
          />
          <Button
            className="btn btn-lg btn-primary btn-block"
            onClick={() => this.handleUserLogin()}
          ><i className="fa fa-sign-in" />{' '}Log In
          </Button>
        </form>
      </div>
    );
  }
}
