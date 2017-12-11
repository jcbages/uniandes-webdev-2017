import React, { Component } from 'react';

/* This is a single melody, like the ones shown in the feed */
export default class Melody extends Component {

	constructor(props){
		super(props);
		this.getColor = this.getColor.bind(this);
		
	}

	getColor(){
		switch(this.props.index%7){
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
		let playButtonOnClick = () => this.props.playMelody(this.props.melody);
		if (this.props.isPlayingMelody(this.props.melody)) {
			playButtonText = 'Stop melody';
			playButtonOnClick = () => this.props.stopMelody();
		}

		// Show/Hide the upvote button depending on if the user is logged or not
		let upvoteButton = null;
		if (this.props.user) {
			upvoteButton = (
				<a className={"waves-effect waves-light btn " + this.getColor() +" white-text"} onClick={this.props.upvoteMelody(this.props.melody)}>
					Upvote melody
				</a>
			);
		}

		return (
			<div className="col s12 m6">
				<div className= {"card " + this.getColor()+"darken-2"}>
					<div className="card-content white-text">
						<span className="card-title">{this.props.melody.type === 1 && 'Random'}{this.props.melody.type === 2 && 'Popular'} {this.props.melody.type === 3 && 'Robot'} Melody</span>
						<p>{this.props.melody.type === 1 && 'Feel the music of everyone, here is a selection of random melodies.'}
						   {this.props.melody.type === 2 && 'Listen to the music of the cool kids, I wish I could be like them, this is trending right now.'}
						   {this.props.melody.type === 3 && 'Beep Boop I\'m a robot who doesn\'t understand human emotions, listen to this.'}
						</p>
					</div>
					<div className="card-action ">
						<a className={"waves-effect waves-light btn " + this.getColor() +" white-text"} onClick={playButtonOnClick}>{playButtonText}</a>
						{upvoteButton}
					</div>
				</div>
		  	</div>
				
		)
	}

}