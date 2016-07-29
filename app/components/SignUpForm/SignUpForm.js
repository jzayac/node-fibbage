import React, { Component, PropTypes } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as authActions from '../../redux/modules/auth';
import styles from './SignUpForm.css';
import * as validation from '../../../utils/validation';

const validate = (data = {}) => {
  const errors = {};
  if (!data.email) {
    errors.email = 'Please enter email';
  } else if (!validation.isEmail(data.email)) {
    errors.email = 'Please enter valid email';
  }
  if (!data.password) errors.password = 'Please enter password';
  if (!data.passwordConf) {
    errors.passwordConf = 'Please enter an passwordConf.';
  } else if (data.password !== data.passwordConf) {
    errors.passwordConf = 'Password must match';
  }
  return errors;
};

@connect(
  state => ({
    loggingIn: state.auth.loggingIn,
    signUpError: state.auth.signUpError,
    signingUp: state.auth.signingUp,
  }),
  authActions)
@reduxForm({
  form: 'SignUp',
  fields: ['email', 'password', 'passwordConf'],
  validate,
})
export default class SignUpForm extends Component {
  static propTypes = {
    loggingIn: PropTypes.bool,
    authDismissError: PropTypes.func,
    signUpError: PropTypes.string,
    signUp: PropTypes.func,
    signingUp: PropTypes.bool,
    fields: PropTypes.object,
    submitting: PropTypes.bool.isRequired,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { fields: { email, password } } = this.props;
    this.props.signUp(email.value, password.value);
  }

  render() {
    const { signUpError, signingUp, authDismissError, loggingIn,
      fields: { email, password, passwordConf },
    } = this.props;
    let disableSubmit = email.error || password.error || passwordConf.error;
    disableSubmit = disableSubmit || signingUp || loggingIn;
    return (
      <div>
        {signUpError &&
          <Alert bsStyle="danger" onDismiss={authDismissError}>
            {signUpError}
          </Alert>
        }
        <form onSubmit={this.handleSubmit}>
          <input
            type="text" ref="email" placeholder="Enter email"
            className={`${styles.widthFull} form-control`}
            {...email}
            disabled={signingUp}
          />
          {email.error && email.touched && <div className="text-danger">{email.error}</div>}
          <input
            type="password" ref="userpass" placeholder="Enter password"
            className={`${styles.widthFull} form-control`}
            {...password}
            disabled={signingUp}
          />
          {password.error && password.touched &&
            <div className="text-danger">{password.error}</div>
          }
          <input
            type="password" ref="userpassconf" placeholder="Confirm password"
            className={`${styles.widthFull} form-control`}
            {...passwordConf}
            disabled={signingUp}
          />
          {passwordConf.error && passwordConf.touched &&
            <div className="text-danger">{passwordConf.error}</div>
          }
          <Button
            className="btn btn-lg btn-primary btn-block"
            disabled={!!disableSubmit}
            type="submit"
          ><i className="fa fa-sign-in" />{' '}Log In
          </Button>
        </form>
      </div>
    );
  }
}
