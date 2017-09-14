import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from './actions/register';
import { logout } from './actions/logout';
import { click } from './actions/click';
import logo from './assets/logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
  }

  updateEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  register = event => {
    event.preventDefault();
    this.props.register(this.state.email);
  };

  render() {
    return (
      <div>
        <div className="nav center">
          <div className="nav-left">
            <span className="logo-small">
              <img src={logo} alt="logo" height="20" />
            </span>
            serverless application
          </div>
          <div className="nav-right">
            {this.props.session &&
              <button className="flat" type="button" onClick={() => {
                this.props.logout()
              }}>
                logout
              </button>
            }
          </div>
        </div>
        <div className="content center">
          <div className="hero-icon">ß</div>
          <div className="title">serverless application</div>
          <div className="tagline center">build more, manage less</div>
          <div className="section">
            {this.props.session
              ? <div className="success">
                Thanks for registering!
                </div>
              : <form onSubmit={this.register}>
                  <input
                    type="email"
                    onChange={this.updateEmail}
                    value={this.state.email}
                    placeholder="enter your email"
                  />
                  <input type="submit" value="register"></input>
                </form>}
          </div>
          <div className="section center">
            <div>
              <h2>build value, fast</h2>
            </div>
            <p>
              There is no faster way to get new projects built and to the market than to use a serverless application.
            </p>
            <button
              className="flat"
              type="button"
              onClick={() => this.props.click('homepage.button.build-value')}
            >
              learn more
            </button>
          </div>
          <div className="section center">
            <div>
              <h2>minimize overhead</h2>
            </div>
            <p>
              Serverless applications are auto-scaling with pay-per-execution
              pricing, reducing overhead like never before
            </p>
            <button
              className="flat"
              type="button"
              onClick={() => this.props.click('homepage.button.minimize-overhead')}
            >
              learn more
            </button>
          </div>
          <div className="section center">
            <div>
              <h2>event-driven</h2>
            </div>
            <p>
              The back-end and front-end of this serverless application is entirely event-driven.
            </p>
            <button
              className="flat"
              type="button"
              onClick={() => this.props.click('homepage.button.event-driven')}
            >
              learn more
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ session: state.session });
const actions = { register, click, logout };

export default connect(mapStateToProps, actions)(App);
