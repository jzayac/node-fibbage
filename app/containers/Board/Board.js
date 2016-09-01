import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { Rooms } from '../../components';

@connect(
  state => ({
    user: state.auth.user,
    error: state.room.error,
  }),
)
export default class Board extends Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  render() {
    const { error, user } = this.props;
    const errorMessage = (
      <div>
        {error && (
          <Alert bsStyle="danger" >
            {error}
          </Alert>
        )}
      </div>
    );
    return (
      <div>
        <Helmet title="board" />
        {errorMessage}
        <h2>player: {user.name}</h2>
        <Rooms socket={this.props.socket} />
      </div>
    );
  }
}
