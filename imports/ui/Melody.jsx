import React, { Component } from 'react';

/* This is a single melody, like the ones shown in the feed */
export default class Melody extends Component {

	/* Render the melody component + children (if any) */
	render() {
		// Define the play button text + action depending on if the props melody is playing
		let playButtonText = 'Play melody';
		let playButtonOnClick = () => this.props.playMelody(this.props.melody);
		if (this.props.isPlayingMelody(this.props.melody)) {
			playButtonText = 'Stop playing melody';
			playButtonOnClick = () => this.props.stopMelody();
		}

		// Show/Hide the upvote button depending on if the user is logged or not
		let upvoteButton = null;
		if (this.props.user) {
			upvoteButton = (
				<button onClick={this.props.upvoteMelody(this.props.melody)}>
					Upvote melody
				</button>
			);
		}

		return (
			<li>
				{/* Current melody information */}
				<p>Melody type: {this.props.melody.type}</p>

				{/* Functionality buttons (play & upvote) */}
				<button onClick={playButtonOnClick}>{playButtonText}</button>
				{upvoteButton}
			</li>
		)
	}

}