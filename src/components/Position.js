import React from 'react';

export default class Position extends React.Component {
  style () {
    return {
      position: 'absolute',
      left: this.props.position.coords[0] - 4,
      top: this.props.position.coords[1] - 3
    }
  }

  render() {
    return (
      <div
        className="position"
        style={this.style()}
      >
        <i className="mouse pointer icon"></i>
        {this.props.position.name}
      </div>
    );
  }
}
