import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { userInfo } from '../../redux/modules/user';
import { Button } from 'react-bootstrap';
import Helmet from 'react-helmet';

@connect(
  state => ({
    user: state.auth.user,
    data: state.user.data,
  }),
  { userInfo })
export default class User extends Component {
  static propTypes = {
    user: PropTypes.object,
    data: PropTypes.string,
    userInfo: PropTypes.func,
  }

  handleGetUserInfo = () => {
    this.props.userInfo();
  }

  render() {
    const { user, data } = this.props;
    return (
      <div>
        <Helmet title="user page" />
        <h1>User profile {user.email}</h1>
        <p>user profile page</p>
        {!data &&
          <Button
            bsSize="large"
            onClick={this.handleGetUserInfo}
          >authorization test
          </Button>
        }
        {data &&
          <div>
            <p>authorized user request</p>
            <p>{data}</p>
          </div>
        }
      </div>
    );
  }
}
