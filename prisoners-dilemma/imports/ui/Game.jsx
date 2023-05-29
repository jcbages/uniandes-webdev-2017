import React, { Component } from 'react';
import { Matches } from '../api/MatchDB.jsx'
import { createContainer } from 'meteor/react-meteor-data';

// Game component - represents the user game
class Game extends Component {
	constructor(props) {
		super(props);
		this.getMessage = this.getMessage.bind(this);
		this.sendRound = this.sendRound.bind(this);
		this.getYears = this.getYears.bind(this);
		this.getContent = this.getContent.bind(this);
	}

	getLoading() {
		return (
			<div id="loading">
				<img src="/img/banana.png" />
			</div>
		);
	}

	getButtons() {
		return (
			<div className="row">
				<div className="col-md-4">
					<button onClick={() => this.sendRound(0)}>
						Remain Silent
					</button>
				</div>
				<div className="col-md-4">
					<button onClick={() => this.sendRound(1)}>
						Betray
					</button>
				</div>
			</div>
		);
	}

	sendRound(decision) {
		Meteor.call('matches.updateMatch', this.props.match._id, this.props.userId, decision);
	}

	getMessage() {
		let match = this.props.match;
		if (match.decisionNumber === 10) {
			return "Game over!";
		} else if (match.left1 || match.left2) {
			return "Your partner left!";
		} else if (match.user2 === null) {
			return this.props.gameMessage;
		} else if (match.decisionNumber === 0) {
			return "We captured your partner in crime";
		} else {
			if (this.props.userId === match.user1) {
				return match.lastMessage1;
			} else {
				return match.lastMessage2;
			}
		}
	}

	getYears() {
		if (this.props.match.user1 === this.props.userId) {
			return this.props.match.score1;
		} else {
			return this.props.match.score2;
		}
	}

	getContent() {
		let match = this.props.match;
		if (match.decisionNumber === 10 || match.left1 || match.left2) {
			return (<div />); //Empty for now pls correct
		} else if (match.user2 === null ||
			(match.user1 === this.props.userId && match.decision2 === -1 && match.decision1 !== -1) ||
			(match.user2 === this.props.userId && match.decision1 === -1 && match.decision2 !== -1)) {
			return this.getLoading();
		} else {
			return this.getButtons();
		}
	}

	componentWillUnmount() {
		Meteor.call('matches.leaveMatch', this.props.match._id, this.props.userId);
	}

	render() {
		//THIS BREAKS PATTERN HORRIBLY PLS CORRECT
		this.props.setRound(this.props.match.decisionNumber + 1);
		return (
			<div id="game">
				<div className="row">
					<div className="col-md-7">
						<h2>{this.getMessage()}</h2>
					</div>
				</div>

				<div className="row">
					<div className="col-md-7">{this.getContent()}</div>

					<div className="col-md-5">
						<h3>
							You've <span>{this.getYears()} years</span> of
								prison in this match
							</h3>
					</div>
				</div>

				<div className="row">
					<div className="col-md-7">
						<h2>{this.props.footerMessage || ''}</h2>
					</div>
				</div>
			</div>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('matchinfo');
	console.log(Matches.find().fetch());
	console.log(Meteor.user());

	let matches = Matches.find({
		$or: [
			{ user1: Meteor.user().username },
			{ user2: Meteor.user().username }
		]
	}).fetch();

	return { match: matches[matches.length-1] };
}, Game);
