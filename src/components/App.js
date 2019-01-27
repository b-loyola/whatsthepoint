import React from 'react';
import openSocket from 'socket.io-client';

import PositionList from './PositionList';

const socket = openSocket('http://localhost:8080');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      positions: {},
    };
  }

  componentDidMount() {
    this.setState({name: prompt('name')});
    socket.on('messages', (msgs) => {
      this.setState({positions: msgs});
    });
  }

  emitMessage(e) {
    const message = {name: this.state.name, coords: [e.pageX, e.pageY]}
    socket.emit('message', message);
  }

  render () {
    return (
      <div id="app" onMouseMove={this.emitMessage.bind(this)}>
        <div>What's the Point?</div>
        <PositionList positions={this.state.positions}/>
      </div>
    );
  }
};
