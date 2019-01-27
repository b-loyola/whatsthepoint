import React from 'react';
import openSocket from 'socket.io-client';

import PositionList from './PositionList';

let host = 'http://localhost:5000';
if (process.env.NODE_ENV === 'production') {
  host = 'https://whatta.herokuapp.com/'
}
const socket = openSocket(host);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      positions: {},
      logged: false,
    };
  }

  initializeSocket() {
    socket.on('messages', (msgs) => {
      this.setState({positions: msgs});
    });
  }

  emitMessage(e) {
    const message = {name: this.state.name, coords: [e.pageX, e.pageY]}
    socket.emit('message', message);
  }

  onNameEnter(e) {
    e.preventDefault()
    this.initializeSocket();
    this.setState({logged: true});
  }

  render () {
    if (this.state.logged) {
      return (
        <div id="app" onMouseMove={this.emitMessage.bind(this)}>
          <div>What's the Point?</div>
          <PositionList positions={this.state.positions}/>
        </div>
      );
    } else {
      return (
        <div id="login">
          <form onSubmit={this.onNameEnter.bind(this)}>
            <label htmlFor="name">Enter Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={(e) => this.setState({name: e.target.value})}
            />
          </form>
        </div>
      );
    }
  }
};
