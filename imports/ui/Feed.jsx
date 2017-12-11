import React, { Component } from 'react';

import Melody from './Melody.jsx';

/* This represents the home feed with generated melodies */
export default class Feed extends Component {

	/* Render the feed component + children (if any) */
	render() {
		let melodies = this.props.melodies.map(
			(melody, index) => <Melody
				key={`melody-${index}`}
				user={this.props.user}
				melody={melody}
				playMelody={this.props.playMelody}
				stopMelody={this.props.stopMelody}
				isPlayingMelody={this.props.isPlayingMelody}
				upvoteMelody={this.props.upvoteMelody} />
		);

		return (
			<div className="feed">

				<h2>These are some auto-generated melodies for you!</h2>

				{/* This is the list of generated melodies */}
				<ul>{melodies}</ul>

				<button onClick={this.props.loadMoreMelodies}>Load more melodies</button>

			</div>
		);
	}

}