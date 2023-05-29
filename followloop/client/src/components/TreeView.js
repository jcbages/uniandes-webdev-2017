import React, { Component } from 'react';

export default class TreeView extends Component {
  // map items to jsx
  getItems() {
    return this.props.tree.map((item, index) => (
      <li key={`tree-${index}`} className="list-group-item">
        
        <div className="col-md-2 float-left f-image">
          <img src={item[0].avatar} alt={item[0].name} />
        </div>

        <div className="col-md-8 f-text">
          <span onClick={this.props.onClickTree(item[0], index)}>
            @{item[0].name}
          </span>
          {' '}follows{' '}
          <span onClick={this.props.onClickTree(item[1], index)}>
            @{item[1].name}
          </span>
        </div>

        <div className="col-md-2 float-right f-image">
          <img src={item[1].avatar} alt={item[1].name} />
        </div>

      </li>
    ));
  }

  // render required as always
  render() {
    return (
      <div id="tree" className="col-md-5">
        <h2>Tree</h2>
        <ul className="list-group">{this.getItems()}</ul>
      </div>
    );
  }
}
