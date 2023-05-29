import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

// Class definition
class Chat extends Component {
	constructor(props) {
		super(props);

		/* Init elapsed time at 0 */
		this.state = { timeElapsed: 0 };
	}

	/* Increase 1 sec the elapsed time */
	updateTime() {
		let timeElapsed = '00:00:00';
		if (this.props.session && this.props.session.status === 'online') {
			let totalTime = (new Date()).getTime() - this.props.session.start.getTime();
			totalTime = parseInt(totalTime / 1000);

			let seconds = totalTime % 60;
			let minutes = parseInt(totalTime / 60) % 60;
			let hours = parseInt(totalTime / 3600);

			if (seconds < 10) seconds = '0' + seconds;
			if (minutes < 10) minutes = '0' + minutes;
			if (hours < 10) hours = '0' + hours;

			timeElapsed = `${hours}:${minutes}:${seconds}`;
		}
		this.setState({ timeElapsed: timeElapsed });
	}

	componentDidMount() {
		this.interval = setInterval(this.updateTime.bind(this), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		/* Define info to display */
		let information = (
			<div className="info">

				<div className="partner">
					<p>Not in session :(</p>
				</div>

				<div className="score">
					<p>Please enter first!</p>
				</div>

			</div>
		)

		/* Change information if current in session */
		if (this.props.session && this.props.session.status !== 'online') {

			information = (
				<div className="info">

					{/* Partner information */}
					<div className="partner">
						<p>Searching a partner</p>
					</div>

					{/* Session information */}
					<div className="session">
						<button className="b1" onClick={this.props.endSession}>
							End Search
						</button>
					</div>

				</div>
			);

		} else if (this.props.session) {

			let partner = this.props.session.p1;
			if (this.props.session.p1.userId === Meteor.userId()) {
				partner = this.props.session.p2;
			}

			information = (
				<div className="info">

					{/* Partner information */}
					<div className="partner">
						<p>Current partner</p>
						<p>@{partner.username}</p>
					</div>

					<div className="score">
						<p>Rating</p>
						<p>{partner.rating} stars</p>
					</div>

					{/* Session information */}
					<div className="session">
						<p>Session length</p>
						<p>{this.state.timeElapsed}</p>

						<button className="b1" onClick={this.props.endSession}>
							End Session
						</button>
					</div>

				</div>
			);

		} else if (this.props.currentUser) {

			information = (
				<div className="info">

					{/* Partner information */}
					<div className="partner">
						<p>Not in session :(</p>
					</div>

					{/* Session information */}
					<div className="session">
						<button className="b1" onClick={this.props.startSession}>
							Start session
						</button>

						<button className="b2" onClick={this.props.logout}>
							Logout
						</button>
					</div>

				</div>
			);

		}

		/* Return render material */
		return (
			<div id="chat" className="col-md-2">

				{/* Oponent Profile Pic */}
				<div className="profile" />

				{/* Oponent Information */}
				{information}

			</div>
		);
	}
}

Chat.propTypes = {};

export default createContainer(() => {
	return {};
}, Chat);
