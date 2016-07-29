import React from 'react';
import styles from './Todo.css';
import { TodoComponent } from '../../components';
import Helmet from 'react-helmet';

export default function Todo() {
  return (
    <div className={styles.todo}>
      <Helmet title="todo page" />
      <h2>simple todo page</h2>
      <TodoComponent />
    </div>
  );
}
