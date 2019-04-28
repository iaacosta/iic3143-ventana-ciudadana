import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import Senador from './components/Senador';

class App extends Component {
  state = {
    senador: null,
  };

  async componentDidMount() {
    const { data } = await axios.get('/senador');
    this.setState({
      senador: data,
    });
  }

  render() {
    const { senador } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {senador ? <Senador data={senador} /> : null}
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
