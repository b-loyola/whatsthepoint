import React from 'react';

import PositionList from './PositionList';
import Login from './Login';
import socket from '../socket';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '',
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
    const message = {name: this.state.name, color: this.state.color, coords: [e.pageX, e.pageY]}
    socket.emit('message', message);
  }

  onNameEnter() {
    this.initializeSocket();
    this.setState({logged: true});
  }

  renderApp() {
    return (
      <div id="app" onMouseMove={this.emitMessage.bind(this)}>
        <div>What's the Point?</div>
        <PositionList positions={this.state.positions}/>
      </div>
    );
  }

  renderLogin() {
    return(
      <Login
        name={this.state.name}
        color={this.state.color}
        onLogin={this.onNameEnter.bind(this)}
        onChangeName={(e) => this.setState({name: e.target.value})}
        onChangeColor={(e) => this.setState({color: e.target.value})}
      />
    );
  }

  render () {
    if (this.state.logged) {
      return this.renderApp()
    } else {
      return this.renderLogin()
    }
  }
};
