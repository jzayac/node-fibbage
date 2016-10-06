import React, { Component, PropTypes } from 'react';
// import { Button, Alert } from 'react-bootstrap';
import styles from './Question.css';
import { connect } from 'react-redux';
import Timer from '../Timer/Timer';
// import api from '../../api';

@connect(
  state => ({
    players: state.room.players,
    user: state.auth.user,
    round: state.room.round,
    roomName: state.room.name,
  })
)
export default class Question extends Component {
  static propTypes = {
    round: PropTypes.array.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      time: 40,
      timeOut: false,
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.emit('remaining time');
    socket.on('elapsed time', (time) => {
      this.setStart({
        time,
        timeOut: time < 1,
      });
    });
    socket.on('time out', () => {
      this.setState({
        time: 0,
        timeOut: true,
      });
    });
    console.log('kurva');
    setInterval(this.tick, 1000);
    // this.timer = setInterval(this.tick, 1000);
  }
  ticker = () => {
    const { time, timeOut } = this.state;
    console.log('time?');
    console.log(timeOut);
    console.log(time);
    if (!timeOut) {
      this.setState({
        time: time - 1,
        timeOut: (time - 1) === 0,
      });
    }
  }
  lieAdded = (e) => {
    e.preventDefault();
    const addLie = this.refs.addLie.value;
    console.log('lie added');
    console.log(addLie);
  }

  render() {
    const { round } = this.props;
    const { time, timeout }  = this.state;
    const question = round[round.length - 1].question;
    console.log('rit');
    console.log(time);
    // const currentRound = round[round.length - 1];
    // const question = currentRound.question;
    // const time = currentRound.time;
    return (
      <div>
        <h3>question</h3>
        <p>{question.question}</p>
        <Timer time={time} />
        <form onSubmit={(e) => { this.lieAdded(e); }}>
          <input
            type="text" ref="addLie" placeholder="add lie"
            className={`${styles.widthFull} form-control`}
          />
        </form>
      </div>
    );
  }
}
