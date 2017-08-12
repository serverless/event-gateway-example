import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from './actions/register';
import { logout } from './actions/logout';
import { logActivity } from './actions/logActivity';
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
            <span className="logo-small"><img src={logo} alt="logo" height="20" /></span>
            <div className="architecture header-text">serverless architecture</div>
          {this.props.session &&
            <button className="flat" type="button" onClick={() => this.props.logout()}>
              logout
            </button>}
        </div>
        <div className="content center">
          <img src={logo} alt="logo" height="84" />
          <h1 className="architecture center">serverless architecture</h1>
          <div className="tagline center">the fast way to get stuff done</div>
          <div className="section center box">
            {this.props.session
              ? <div className="message">thanks for registering!</div>
              : <form onSubmit={this.register}>
                  <input
                    type="email"
                    onChange={this.updateEmail}
                    value={this.state.email}
                    placeholder="enter your email"
                  />
                  <button className="flat register">register</button>
                </form>}
          </div>
          <div className="section center">
            <div>
              <h2>build value, fast</h2>
            </div>
            <div>
              There is no faster way to get new projects built and to the market
            </div>
            <button 
              className="flat"
              type="button"
              onClick={() => this.props.logActivity('build-value')}
            >
              learn more
            </button>
          </div>
          <div className="section center">
            <div>
              <h2>minimize overhead</h2>
            </div>
            <div>
              Serverless architectures are auto-scaling with pay-per-execution
              pricing, reducing overhead like never before
            </div>
            <button
              className="flat"
              type="button"
              onClick={() => this.props.logActivity('minimize-overhead')}
            >
              learn more
            </button>
          </div>
          <div className="section center">          
            <div>
              <h2>make multi-cloud accessible</h2>
            </div>
            <div>
              Serverless architectures are auto-scaling with pay-per-execution
              pricing, reducing overhead like never before
            </div>
            <button
              className="flat"
              type="button"
              onClick={() => this.props.logActivity('multi-cloud')}
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
const actions = { register, logActivity, logout };

export default connect(mapStateToProps, actions)(App);
