import React, { Component } from 'react';

export default class FollowersView extends Component {
  // map items to jsx
  getItems() {
    return this.props.followers.map((follower, index) => (
      <li
        key={`follower-${index}`}
        className="list-group-item row"
        onClick={this.props.onClickFollower(follower)}>
        
        <div className="col-md-3 float-left f-image">
          <img src={follower.avatar} alt={follower.name} />
        </div>
        
        <div className="col-md-6 f-text">
          <span>@{follower.name}</span>
        </div>

      </li>
    ));
  }

  // render required as always
  render() {
    if (this.props.status === 'READY') {
      return (
        <div id="followers" className="col-md-4">
          <h2>Followers</h2>
          <ul className="list-group">{this.getItems()}</ul>
        </div>
      );
    } else {
      return (
        <div id="followers" className="col-md-4">
          <h2>Followers</h2>
          <h5>Loading...</h5>
        </div>
      );
    }
  }
}
