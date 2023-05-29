import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Header from './Header.jsx';
import About from './About.jsx';
import Help from './Help.jsx';
import User from './User.jsx';
import Game from './Game.jsx';
import Footer from './Footer.jsx';

import { Users } from '../api/UsersDB.jsx';
import { createContainer } from 'meteor/react-meteor-data';

// App component - represents the whole app
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inGame: false,
			isConnected: false
		};

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.exitGame = this.exitGame.bind(this);
		this.enterGame = this.enterGame.bind(this);
		this.setRound = this.setRound.bind(this);
		this.updateGameMessage = this.updateGameMessage.bind(this);
	}

	getHome() {
		return (
			<div>
				<About />

				<Help />
			</div>
		);
	}

	getUserHome() {
		return (
			<User onEnterGame={this.enterGame} userId={this.props.currentUser.username} />
		);
	}

	getGame() {
		return (
			<Game
				gameMessage={this.state.gameMessage}
				userId={this.props.currentUser.username}
				setRound={this.setRound}
			/>
		);
	}

	updateGameMessage(msg) {
		this.setState({ gameMessage: msg });
	}

	login() {
		Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'] }, function (err) {
			if (err) {
				console.log('Handle errors here: ', err);
			}
		});
	}

	logout() {
		Meteor.logout();
		this.setState({ inGame: false });
	}

	setRound(number) {
		this.setState({ round: number });
	}

	enterGame() {
		let self = this;
		Meteor.call('matches.findMatch', this.props.currentUser.username, (err, result) => {
			self.setState({ inGame: true, round: 1, years: 0, isConnected: false });
			self.updateGameMessage('Please wait while we find a prisoner for you');
		});
	}

	exitGame() {
		this.setState({ inGame: false });
	}

	tryAddUser(newFacebookId, newUserName) {
		Meteor.call('users.tryAddUser', newFacebookId, newUserName);
	}

	render() {
		let content = this.getHome();
		if (this.props.currentUser && !this.state.inGame) {
			content = this.getUserHome();
		} else if (this.props.currentUser && this.state.inGame) {
			content = this.getGame();
		}

		let title = null;
		if (this.props.currentUser && this.state.inGame) {
			title = `Round ${this.state.round}`;
		}

		return (
			<div id="app" className="container-fluid">
				<Header
					title={title}
					inGame={this.state.inGame}
					onLogin={this.login}
					onLogout={this.logout}
					onExitGame={this.exitGame} />

				{content}

				<Footer />

				<img id="bg" src="/img/bg.png" />
			</div>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('userData');
	return { currentUser: Meteor.user() }
}, App);
