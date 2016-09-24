import React, { Component, PropTypes } from 'react';
import { Button, Alert } from 'react-bootstrap';
// import styles from './Room.css';
import { connect } from 'react-redux';
import api from '../../api';

@connect(
  state => ({
    players: state.room.players,
    user: state.auth.user,
    round: state.room.round,
  })
)
export default class ChoseCategory extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
    round: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      category: [],
      error: undefined,
    };
  }

  componentWillMount() {
    const { socket, players, round, user } = this.props;
    const idx = Math.floor(round.length / players.length);
    const playerChoosing = players[idx].name === user.name;
    if (playerChoosing) {
      this.getCategory();
      // socket.emit('get question category');
    }
    socket.on('choose category update', (data) => {
      console.log('chose CATEGORY');
      console.log(data);
    });
    // socket.on('choose category update', (update) => {
    //
    // });
  }

  async getCategory() {
    const res = await api({
      method: 'get',
      url: '/question/category',
    }).then(
      (data) => data,
      (err) => err,
    );
    this.setState({
      error: res.error || undefined,
      category: res.data || this.state.category,
    });
    console.log('================');
    console.log(res);
    console.log('---------------');
  }

  choseCategoryHandler = () => {
    console.log('chosed category');
  }

  render() {
    const { round, players, user } = this.props;
    const { category, error } = this.state;
    const idx = Math.floor(round.length / players.length);
    const playerChoosing = players[idx].name === user.name;
    return (
      <div>
        <h3>choose category</h3>
        {playerChoosing && (
          <div>
            {error && (
              <Alert bsStyle="danger" >
                {error}
              </Alert>
            )}
            {category && category.map((e, key) => (
              <p key={key}>
                <span>{e}</span>
              </p>
            ))}
          </div>
        )}
        {!playerChoosing && (
          <span>player choosing category {players[idx].name}</span>
        )}
      </div>
    );
  }
}
