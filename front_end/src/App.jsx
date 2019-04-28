import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    koaMessage: '...',
  };

  async componentDidMount() {
    const { data } = await axios.get('/main');
    this.setState({
      koaMessage: data.message,
    });
  }

  render() {
    const { koaMessage } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h2>{koaMessage}</h2>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code> src / App.jsx </code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
