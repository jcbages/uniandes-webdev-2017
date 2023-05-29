import React, { Component } from 'react';
import { Users } from '../api/UsersDB.jsx'
import { createContainer } from 'meteor/react-meteor-data';

// User component - represents the user home
class User extends Component {
	getStats() {
		if (this.props.player.totalGames === 0) {
			return (
				<div className="row">
					<div className="col-md-7">
						<h3>You have played no games :c</h3>
					</div>
				</div>
			);
		} else {
			let avgYears = parseFloat(
				this.props.player.totalYears / this.props.player.totalGames
			).toFixed(2);

			return (
				<div className="row">
					<div className="col-md-7">
						<h3>You have played {this.props.player.totalGames} games.</h3>
						<h3>You have spent on average {avgYears} years in jail.</h3>
						<h3>Your best run had you spending {this.props.player.bestGameYears} years in jail.</h3>
					</div>
				</div>
			);
		}	
	}

	render() {
		return (
			<div id="user">
				<div className="row">
					<div className="col-md-7">
						<h2>Hello again {this.props.player.userName}, take a look at your stats&hellip;</h2>
					</div>
				</div>

				{this.getStats()}

				<div className="row">
					<div className="col-md-1" />

					<div className="col-md-3">
						<button onClick={this.props.onEnterGame}>
							Let's play!
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default createContainer(props => {
	Meteor.subscribe('internalUsers');
	return { player: Users.findOne({ facebookId: props.userId }) }
}, User);
