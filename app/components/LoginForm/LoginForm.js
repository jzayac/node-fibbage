import React, { Component, PropTypes } from 'react';
import { Button, Alert } from 'react-bootstrap';
import styles from './LoginForm.css';
import { connect } from 'react-redux';
import * as authActions from '../../redux/modules/auth';
import { Link } from 'react-router';

@connect(
  state => ({
    user: state.auth.user,
    loginError: state.auth.loginError,
    loggingIn: state.auth.loggingIn,
  }),
  authActions)
export default class LoginForm extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func.isRequired,
    loginError: PropTypes.array,
  }
  handleUserLogin = () => {
    const user = this.refs.nick;
    this.props.login(user.value);
  }

  render() {
    const { user, loginError } = this.props;
    if (user) {
      return (
        <div>
          <h4>hello {user.name}</h4>
          <Link to="/board" activeClassName="active">select room</Link>
        </div>
      );
    }
    return (
      <div className={styles.loginForm}>
        {user &&
          <div>
            <h4>hello {user.name}</h4>
            <Link to={'/board'} activeClassName="active">link to board</Link>
          </div>
        }
        {loginError && loginError.map(e =>
          <Alert bsStyle="danger" >
            {e}
          </Alert>
        )}
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
