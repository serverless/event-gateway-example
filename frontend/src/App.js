import React, { Component } from 'react';
import logo from './logo.png';

class App extends Component {
  render() {
    return (
      <div>
        <div className="nav center">
          <div className="architecture">serverless architecture</div>
        </div>
        <div className="content">
          <img src={logo} alt="logo" height="84" />
          <h1 className="architecture center">serverless architecture</h1>
          <div className="tagline center">the fast way to get stuff done</div>
          <div className="center">
            <h2>build value, fast</h2>
          </div>
          <div className="center">
            There is no faster way to get new projects built and to the market
          </div>
          <button type="button">learn more</button>
          <div className="center">
            <h2>minimize overhead</h2>
          </div>
          <div className="center">
            Serverless architectures are auto-scaling with pay-per-execution
            pricing, reducing overhead like never before
          </div>
          <button type="button">learn more</button>
          <div className="center">
            <h2>make multi-cloud accessible</h2>
          </div>
          <div className="center">
            Serverless architectures are auto-scaling with pay-per-execution
            pricing, reducing overhead like never before
          </div>
          <button type="button">learn more</button>
        </div>
      </div>
    );
  }
}

export default App;
