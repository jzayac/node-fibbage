
import React from 'react';
import Helmet from 'react-helmet';
import { SignUpForm } from '../../components';
import Styles from './SignUp.css';

export default function SingUp() {
  return (
    <div>
      <Helmet title="Sing up" />
      <h1>Sign up</h1>
      <div className={Styles.signUp}>
        <SignUpForm />
      </div>
    </div>
  );
}
