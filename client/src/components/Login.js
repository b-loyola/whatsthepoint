import React from 'react';

export default class Login extends React.Component {
  onSubmit(e) {
    e.preventDefault()
    this.props.onLogin()
  }

  render() {
    return (
      <div id="login" className="ui middle aligned center aligned grid" style={{height: '100%'}}>
        <div className="column" style={{maxWidth: '450px'}}>
          <h3>Hello!</h3>
          <form className="ui large form" onSubmit={this.onSubmit.bind(this)}>
            <div className="field">
              <input
                placeholder="Enter your name"
                name="name"
                type="text"
                value={this.props.name}
                onChange={this.props.onChange}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
