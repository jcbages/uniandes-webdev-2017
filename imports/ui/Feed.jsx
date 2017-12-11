import React, { Component } from 'react';

import Melody from './Melody.jsx';

import './App.css';

/* This represents the home feed with generated melodies */
export default class Feed extends Component {

	/* Render the feed component + children (if any) */
	render() {
		let melodies = this.props.melodies.map(
			(melody, index) => <Melody
				key={`melody-${index}`}
				user={this.props.user}
				melody={melody}
				index={index}
				play={this.props.play}
				stop={this.props.stop}
				isPlaying={this.props.isPlaying}
				upvoteMelody={this.props.upvoteMelody} />
		);

		return (
			<div className="feed w3-main title">

				<div className ='row'>
					<h2 className="title col s6 m12">These are some auto-generated melodies for you!</h2> 
					<a
						className="waves-effect waves-light btn deep-purple darken-2 col s6 m2 title"
						onClick={this.props.loadMoreMelodies}>
						MORE!
					</a>
				</div>

				{/* This is the list of generated melodies */}
				<div className="row">{melodies}</div>
				
			</div>
		);
	}

}