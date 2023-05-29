import React, { Component } from 'react';

export default class HistoryView extends Component {
  // map items to jsx
  getItems() {
    return this.props.history.map((item, index) => (
      <li
        key={`item-${index}`}
        className="list-group-item row"
        onClick={this.props.onClickHistory(item)}>
        
        <div className="f-text">
          <span>Last user: @{item.user.name}</span>
        </div>

      </li>
    ));
  }

  // render required as always
  render() {
    if (this.props.status === 'READY') {
      return (
        <div id="history" className="col-md-3">
          <h2>History</h2>
          <ul className="list-group">{this.getItems()}</ul>
        </div>
      );
    } else {
      return (
        <div id="history" className="col-md-3">
          <h2>History</h2>
          <h5>Loading...</h5>
        </div>
      );
    }
  }
}
