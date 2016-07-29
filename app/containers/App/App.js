import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import styles from './App.css';
import { connect } from 'react-redux';
import { logout } from '../../redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
  }),
  { logout })
export default class App extends Component {
  static propTypes = {
    logout: PropTypes.func,
    user: PropTypes.object,
    children: React.PropTypes.element.isRequired,
  }
  handleAlertDismiss = () => {
    this.setState({ alertVisible: false });
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const { user } = this.props;
    return (
      <div className={styles.app}>
        {true &&
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <IndexLink to="/" >
                  <span>Demo</span>
                </IndexLink>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to="/todo">
                  <NavItem eventKey={1}>todo</NavItem>
                </LinkContainer>
                {user && <LinkContainer to="/user">
                  <NavItem eventKey={2}>user page</NavItem>
                </LinkContainer>}
                <LinkContainer to="/not-found">
                  <NavItem eventKey={3}>not found</NavItem>
                </LinkContainer>
              </Nav>
              {user &&
                <Nav pullRight>
                  <Navbar.Text>
                    Signed in as: <span>{user.email}</span>
                  </Navbar.Text>
                  <LinkContainer to="/logout">
                    <NavItem eventKey={4} onClick={this.handleLogout}>Logout</NavItem>
                  </LinkContainer>
                </Nav>
              }
            </Navbar.Collapse>
          </Navbar>
        }

        <div className={`${styles.content} container`} >
          {this.props.children}
        </div>

      </div>
    );
  }
}
