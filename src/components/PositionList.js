import React from 'react';

import Position from './Position';

export default class PositionList extends React.Component {
  renderPositions() {
    let list = [];
    Object.keys(this.props.positions).forEach((key) => {
      list.push(
        <Position key={key} position={this.props.positions[key]}/>
      );
    });
    return list;
  }

  render () {
    return (
      <div className="postitions">
        {this.renderPositions()}
      </div>
    );
  }
};
