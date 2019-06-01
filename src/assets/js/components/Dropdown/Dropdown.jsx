import axios from 'axios';
import React, { Component, createRef } from 'react';

export default class Dropdown extends Component {
  trigger = createRef();

  state = {
    open: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick = event => {
    if (
      event.target !== this.trigger.current &&
      event.target.className !== 'dropdown__item'
    ) {
      this.setState({ open: false });
    }
  };

  logOut = async () => {
    try {
      await axios.delete('/session');
    } catch (e) {
      if (e.response.status === 303) window.location.reload();
    }
  };

  renderDropdown = () => {
    return (
      <ul className="dropdown">
        <a href="/user">
          <li className="dropdown__item">Mi perfil</li>
        </a>
        <li onClick={this.logOut} className="dropdown__item">
          Cerrar sesión
        </li>
      </ul>
    );
  };

  toggle = () => {
    this.setState(prev => ({
      open: !prev.open,
    }));
  };

  render() {
    const { nombre } = this.props;
    const { open } = this.state;
    return (
      <>
        <li
          className="nav-items__item nav-items__dropdown"
          ref={this.trigger}
          onClick={this.toggle}
        >
          {nombre}
          <span className="arrow">&#x25BC;</span>
        </li>
        {open ? this.renderDropdown() : null}
      </>
    );
  }
}
