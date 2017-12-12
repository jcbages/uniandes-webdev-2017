import React, { Component } from 'react';

/* This is a single melody, like the ones shown in the feed */
export default class Melody extends Component {

	constructor(props){
		super(props);
		this.getColor = this.getColor.bind(this);
		
	}
	
	/*Buen manejo para la asignacion de colores*/
	/* Define the class color based on position */
	getColor(){
		switch (this.props.index % 7) {
		case 0:
			return 'deep-purple ';
			break;
		case 1:
			return 'blue ';
			break;
		case 2:
			return 'teal ';
			break;
		case 3:
			return 'amber ';
			break;
		case 4:
			return 'red ';
			break;
		case 5:
			return 'green ';
			break;
		case 6:
			return 'cyan ';
			break;
		}
	}

	/* Render the melody component + children (if any) */
	render() {

		// Define the play button text + action depending on if the props melody is playing
		let playButtonText = 'Play melody';

		let playButtonOnClick = () => this.props.play(this.props.melody);
		if (this.props.isPlaying(this.props.melody.playStrings)) {
			playButtonText = 'Stop melody';
			playButtonOnClick = () => this.props.stop();
		}

		// Show/Hide the upvote button depending on if the user is logged or not
		let upvoteButton = null;
		if (this.props.user) {
			upvoteButton = (
				<a
					className={'waves-effect waves-light btn ' + this.getColor() + ' white-text'}
					onClick={this.props.upvoteMelody(this.props.melody)}>
					Upvote melody
				</a>
			);
		}

		// Define the message & title based on melody type
		let melodyTitle, melodyMessage;
		if (this.props.melody.type === 1) {
			melodyTitle = 'Random Melody';
			melodyMessage = 'Feel the music of everyone, here is a selection of random melodies.';
		} else if (this.props.melody.type === 2) {
			melodyTitle = 'Popular Melody';
			melodyMessage = (
				'Listen to the music of the cool kids, I wish I could be like them, ' +
				'this is trending right now.'
			);
		} else if (this.props.melody.type === 3) {
			melodyTitle = 'Robot Melody';
			melodyMessage = (
				'Beep Boop I\'m a robot who doesn\'t '+
				'understand human emotions, listen to this.'
			);
		}

		// Get the div & button style class
		let divStyle = 'card ' + this.getColor() + 'darken-2';
		let buttonStyle = 'waves-effect waves-light btn ' + this.getColor() + 'white-text';

		return (
			<div className="col s12 m6">
				<div className= {divStyle}>
					<div className="card-content white-text">
						<span className="card-title">{melodyTitle}</span>
						<p>{melodyMessage}</p>
					</div>
					<div className="card-action">
						<a className={buttonStyle} onClick={playButtonOnClick}>{playButtonText}</a>
						{upvoteButton}
					</div>
				</div>
		  	</div>
		);

	}

}
