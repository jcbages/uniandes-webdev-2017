import React, { Component } from 'react';

import SearchView from './components/SearchView';
import FollowersView from './components/FollowersView';
import TreeView from './components/TreeView';
import HistoryView from './components/HistoryView';

export default class App extends Component {
  constructor(props) {
    super(props);

    // define initial state
    this.state = {
      text: '',
      user: null,
      status: 'READY',
      historyStatus: 'READY',
      followers: [],
      tree: [],
      history: []
    }

    // bind functions for jsx
    this.onSave = this.onSave.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickTree = this.onClickTree.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.fetchHistory = this.fetchHistory.bind(this);
    this.onClickHistory = this.onClickHistory.bind(this);    
    this.onClickFollower = this.onClickFollower.bind(this);    
  }

  componentDidMount() {
    this.fetchHistory();
  }

  getValidState(target) {
    let ans = {};
    let keys = ['status', 'user', 'text', 'followers', 'tree'];
    for (let i = 0; i < keys.length; i++) ans[keys[i]] = target[keys[i]];
    return ans;
  }

  fetchFollowers(user) {
    // show loading view
    this.setState({status: 'LOADING'});

    // fetch followers list
    return fetch(`/followers/${user.name}`)
    .then(res => res.ok ? res.json() : [])
    .then(res => ({
      status: 'READY',
      user: {name: user.name, avatar: user.avatar},
      text: user.name,
      followers: res.data.map(user => ({
        name: user.login,
        avatar: user.avatar_url
      }))
    }))
  }

  fetchHistory() {
    // show loading view
    this.setState({historyStatus: 'LOADING'});

    // retrieve histories in db
    fetch('/history')
    .then(res => res.ok ? res.json() : [])
    .then(res => this.setState({
      historyStatus: 'READY',
      history: res
    }))
  }

  onTextChange(event) {
    // update typed text
    this.setState({text: event.target.value});
  }

  onSave() {
    // save history data
    let clone = JSON.parse(JSON.stringify(this.state));
    let data = JSON.stringify(this.getValidState(clone));

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch('/history', {method: 'post', headers: headers, body: data})
    .then(res => res.ok ? res.json() : null)
    .then(this.fetchHistory);
  }

  onSubmit() {
    // fetch the followers users list
    // update state & clean tree
    let defaultAvatar = 'https://avatars3.githubusercontent.com' +
      '/u/4754941?v=4&s=400&u=e6f3a62dd9ff5e05ee94d94bac2466710c81bded';

    // get curr user
    let user = this.state.user ? this.state.user : {
      name: this.state.text,
      avatar: defaultAvatar
    };

    this.fetchFollowers(user)
    .then(state => this.setState(state))
    .then(() => this.setState({tree: []}));
  }

  onClickFollower(user) {
    return () => {
      // fetch the followers user list
      // update state & update tree
      this.fetchFollowers(user)
      .then(state => {
        let tree = this.state.tree;
        tree.push([this.state.user, user]);
        this.setState({tree: tree});
        return state;
      })
      .then(state => this.setState(state));
    }
  }

  onClickTree(user, index) {
    return () => {
      // fetch the followers user list
      // update state & update tree
      this.fetchFollowers(user)
      .then(state => {
        let tree = this.state.tree;
        this.setState({tree: tree.slice(0, index)});
        return state;
      })
      .then(state => this.setState(state));
    }
  }

  onClickHistory(item) {
    return () => {
      // load history to state
      this.setState(this.getValidState(item));
    }
  }

  // render required as always
  render() {
    return (
      <div id="App" className="container">
        <div className="row" id="title">
          <div className="col-md-12">
            <h1>Github followers</h1>
            <hr />
          </div>
        </div>

        <SearchView
          onSave={this.onSave}
          onSubmit={this.onSubmit}
          text={this.state.text}
          onTextChange={this.onTextChange} />
        
        <div className="row">
          <FollowersView
            followers={this.state.followers}
            status={this.state.status}
            onClickFollower={this.onClickFollower} />

          <TreeView
            tree={this.state.tree}
            onClickTree={this.onClickTree} />

          <HistoryView
            history={this.state.history}
            status={this.state.historyStatus}
            onClickHistory={this.onClickHistory} />
        </div>
      </div>
    );
  }
}
