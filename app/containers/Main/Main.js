import React from 'react';
import styles from './Main.css';
import Helmet from 'react-helmet';
import { Jumbotron } from 'react-bootstrap';
import { LoginForm } from '../../components';
// import { LoginForm } from 'node-fibbage/app/components';

// export default class Main extends Component {
export default function Main() {
  return (
    <div className={styles.main}>
      <Helmet title="home" />
      <Jumbotron>
        <h1>fibbage</h1>
        <LoginForm />
      </Jumbotron>
    </div>
  );
}
