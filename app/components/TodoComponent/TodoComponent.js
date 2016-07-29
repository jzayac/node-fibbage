import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as todoActions from '../../redux/modules/todo';
import styles from './TodoComponent.css';
import { Button, Checkbox } from 'react-bootstrap';

@connect(
  state => ({
    todos: state.todo.todos,
    loader: state.todo.loader,
    filter: state.todo.filter,
  }),
  todoActions)
export default class TodoComponent extends Component {
  static propTypes = {
    todos: PropTypes.array,
    addTodo: PropTypes.func,
    getTodo: PropTypes.func,
    updateTodo: PropTypes.func,
    deleteTodo: PropTypes.func,
    loader: PropTypes.bool,
  }

  componentWillMount = () => {
    this.props.getTodo();
  }

  handleAddTodo = (event) => {
    event.preventDefault();
    const input = this.refs.todoinput;
    this.props.addTodo(input.value);
    input.value = '';
  }

  toggleTodo = (todo) => {
    const c = {
      ...todo,
      done: !todo.done,
    };
    this.modifyTodo(c);
  }

  modifyTodo = (todo) => {
    this.props.updateTodo(todo);
  }

  deleteTodo = (id) => {
    this.props.deleteTodo(id);
  }

  render() {
    const { todos, loader } = this.props;
    return (
      <div className="container">
        <div className={styles.todocomponent}>
          <div className={styles.todoHeader}>
            <input ref="todoinput" placeholder="new todo" ></input>
            <Button
              className="btn-success"
              onClick={this.handleAddTodo} disabled={loader}
            >{'add new'}</Button>
          </div>
          <div>
            {todos && todos.map((todo) =>
              <div className={styles.todoRow} key={todo.id}>
                <Checkbox
                  readOnly={loader} checked={todo.done}
                  className={styles.todoCheckbox}
                  onClick={() => this.toggleTodo(todo)}
                />
                <span
                  className={todo.done ? styles.complete : ''}
                >{todo.todo}</span>
                <Button
                  className={styles.todoButton}
                  onClick={() => this.deleteTodo(todo.id)}
                  disabled={loader}
                >X</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
