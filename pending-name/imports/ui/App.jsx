import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Sessions } from '../api/sessions.js';

import Navbar from './Navbar.jsx';
import Chat from './Chat.jsx';
import Console from './Console.jsx';

// Class definition
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			consoleContent: [
				'$ Welcome to the "Pending name" interview practice site.',
				'$ ',
				'$ What is this?',
				'$ This is a website for practicing technical interviews with strangers.',
				'$ We believe this can be a funny way to practice & get that desired tech job.',
				'$ ',
				'$ How does it works?',
				'$ 1. You enter by hitting the upper-left navbar button.',
				'$ 2. Once you\'re in, hit the "Start session" button on the left.',
				'$ 3. Type "help" in the console so you can get more instructions.',
				'$ ',
				'$ Please remember to have a lot of fun :D'
			]
		};

		/* Bind functions */
		this.printLine = this.printLine.bind(this);
		this.printHelp = this.printHelp.bind(this);
		this.readChallenge = this.readChallenge.bind(this);
		this.requestChallenge = this.requestChallenge.bind(this);
		this.printLink = this.printLink.bind(this);
		this.requestLink = this.requestLink.bind(this);


		this.startSession = this.startSession.bind(this);
		this.endSession = this.endSession.bind(this);
		this.logout = this.logout.bind(this);
	}

	/* Keep console scroll at bottom */
	scrollBottom() {
		let div = document.getElementById('console');
		div.scrollTop = div.scrollHeight;
	}

	/* Print something to the console */
	printLine(line) {
		let newConsoleContent = this.state.consoleContent.slice();
		
		if (typeof line !== 'object') {
			newConsoleContent.push(line);
		} else {
			for (let i = 0; i < line.length; ++i) {
				newConsoleContent.push(line[i]);
			}
		}
		
		this.setState({ consoleContent: newConsoleContent }, this.scrollBottom);
	}

	/* Print help menu */
	printHelp() {
		this.printLine([
			'$ Available commands:',
			'$ * "read" To open current challenge.',
			'$ * "request" To request a new challenge (forgetting the old one).',
			'$ * "link" To print the current Hangouts url.',
			'$ * "renew" To request a new Hangouts url.'
		]);
	}

	/* Read the current session challenge */
	readChallenge() {
		if (this.props.session && this.props.session.status === 'online') {
			// Print challenge lines
			let lines = [];			
			let challengeLines = this.props.session.challenge.statement.split('.');
			for (let i = 0; i < challengeLines.length; ++i) {
				lines.push('$ ' + challengeLines[i]);
			}
			this.printLine(lines);
		} else {
			this.printLine('$ There is no session in progress :(');
		}
	}

	/* Request a new challenge for current session */
	requestChallenge() {
		if (this.props.session && this.props.session.status === 'online') {
			Meteor.call('sessions.requestChallenge', this.props.session._id);
			this.printLine('$ New challenge requested :)');
		} else {
			this.printLine('$ There is no session in progress :(');
		}
	}

	/* Print the session hangouts url */
	printLink(isNew=false) {
		if (this.props.session && this.props.session.status === 'online') {
			this.printLine(['$ ' + this.props.session.hangouts]);
		} else {
			this.printLine('$ There is no session in progress :(');
		}
	}

	/* Generate a new Hangouts link */
	requestLink() {
		if (this.props.session && this.props.session.status === 'online') {
			Meteor.call('sessions.requestLink', this.props.session._id);
			this.printLine('$ New Hangouts URL requested :D');
		} else {
			this.printLine('$ There is no session in progress :(');
		}
	}

	/* Search a session to begin */
	startSession() {
		Meteor.call('sessions.start');
	}

	/* End the current session */
	endSession() {
		if (this.props.session) {
			Meteor.call('sessions.end', this.props.session._id);
		}
	}

	/* Logout from meteor */
	logout() {
		this.endSession();
		Meteor.logout();
	}

	render() {
		return (
			<div className="container-fluid">

				{/* Navbar */}
				<Navbar
					currentUser={this.props.currentUser}
				/>

				{/* Chat + Console */}
				<div className="row">

					{/* Chat */}
					<Chat
						session={this.props.session}
						currentUser={this.props.currentUser}
						startSession={this.startSession}
						endSession={this.endSession}
						logout={this.logout}
					/>

					{/* Console */}
					<Console
						currentUser={this.props.currentUser}
						consoleContent={this.state.consoleContent}
						requestChallenge={this.requestChallenge}
						printLine={this.printLine}
						printHelp={this.printHelp}
						readChallenge={this.readChallenge}
						requestChallenge={this.requestChallenge}
						printLink={this.printLink}
						requestLink={this.requestLink}
					/>

				</div>

			</div>
		);
	}
}

App.propTypes = {
	currentUser: PropTypes.object
}

export default createContainer(() => {
	Meteor.subscribe('sessions');

	return {
		session: Sessions.findOne({}),
		currentUser: Meteor.user()
	};
}, App);
