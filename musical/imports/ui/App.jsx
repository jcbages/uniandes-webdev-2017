import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Melodies } from '../api/melodies.js';
import { Compositions } from '../api/compositions.js';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx'
import MyCompositions from './MyCompositions.jsx';
import MelodyBox from './MelodyBox.jsx';
import SoundMagic from './SoundMagic';
import Tone from 'tone';

import './App.css';

/* This is the main/root component, everything begins here */
class App extends Component {

	/* Initialize evetyhing that needs to be initialized */
	constructor(props) {
		super(props);

		// Define the component mutable state
		this.state = {
			view: 'feed',
			currentSM: undefined,
			playingString: undefined
		};

		// Bind function's scope so they can be used by other components
		this.changeView = this.changeView.bind(this);
		this.loadMoreMelodies = this.loadMoreMelodies.bind(this);

		this.play = this.play.bind(this);
		this.stop = this.stop.bind(this);
		this.isPlaying = this.isPlaying.bind(this);
		this.upvoteMelody = this.upvoteMelody.bind(this);
		
		this.saveComposition = this.saveComposition.bind(this);
		this.deleteComposition = this.deleteComposition.bind(this);

		this.logout = this.logout.bind(this);

		// Define the synth object
		this.synth =  new Tone.PolySynth(6, Tone.Synth, {
			'oscillator' : { 'partials' : [0, 2, 3, 4] }
		}).toMaster();
		Tone.Transport.start();
	}

	/* Load more melodies at initialization */
	componentWillMount() {
		this.loadMoreMelodies();
	}

	/* Change the view for the given one */
	changeView(view) {
		return () => this.setState({ view: view });
	}

	/* Start playing the given sound & stop any other currently playing sound (if any) */
	play(target) {
		return this.stop(() => {
			let toPlay;
			if (target.playString) {
				toPlay = [target.playString];
			} else {
				toPlay = target.playStrings;
			}
			
			this.setState({
				currentSM: new SoundMagic(toPlay, this.synth),
				playingString: toPlay
			}, () => this.state.currentSM.start());
		});
	}

	/* Stop playing the currently playing sound (if any) */
	stop(cb) {
		if (this.state.currentSM) this.state.currentSM.stop();
		this.setState({ currentSM: undefined, playingString: undefined }, cb);
	}

	/* Check if the given sound is currently playing */
	isPlaying(target) {
		return this.state.playingString === target;
	}

	/* Increase by one the number of upvotes for the given melody */
	upvoteMelody(melody) {
		return () => {
			Meteor.call('compositions.upvote', melody.ids[0]);
			Meteor.call('compositions.upvote', melody.ids[1]);
		}
	}

	/* Logout from the current user account */
	logout() {
		this.stop(() => {
			Meteor.logout();
			this.setState({ view: 'feed' });
		});
	}

	/* Delete the given composition */
	deleteComposition(composition) {
		return () => {
			if (this.isPlaying(composition.playString)) {
				this.stop(() => Meteor.call('compositions.delete', composition._id));
			} else {
				Meteor.call('compositions.delete', composition._id);
			}
		}
	}

	/* Load/Generate more melodies */
	loadMoreMelodies() {
		Meteor.call('melodies.loadMore');
	}

	saveComposition(freq) {
		// Define title
		let max = 10000, min = 1000;
		let number = parseInt(Math.random() * (max - min) + min);

		// Define composition object
		let composition = {
			name: 'Composition #' + number,
			playString: freq
		};

		// Call save method
		Meteor.call('compositions.save', composition);
	}

	componentWillUnmount() {
		this.stop();
	}
	
	/* Render the app component + children (if any) */
	render() {
		let content;
		if (this.state.view === 'feed') {
			content = <Feed  
				user={this.props.user}
				melodies={this.props.melodies}
				play={this.play}
				stop={this.stop}
				isPlaying={this.isPlaying}
				upvoteMelody={this.upvoteMelody}
				loadMoreMelodies={this.loadMoreMelodies} />;
		} else if (this.state.view === 'myCompositions') {
			content = <MyCompositions 
				user={this.props.user}
				compositions={this.props.compositions}
				deleteComposition={this.deleteComposition} />;
		} else if (this.state.view === 'createComposition') {
			content = <MelodyBox 
				editable = {true} 
				saveFunction = {this.saveComposition} />;
		}

		return (
			<div className = 'App'>

				<Navbar 
					user={this.props.user}
					changeView={this.changeView}
					logout={this.logout} />

				<div className="login-button">
					<AccountsUIWrapper />
				</div>
				
				{content}

			</div>
		);
	}

}

/* Export container & subscribe props */
export default createContainer(() => {
	Meteor.subscribe('melodies');
	Meteor.subscribe('compositions');

	return {
		melodies: Melodies.find({}).fetch(),
		compositions: Compositions.find({}).fetch(),
		user: Meteor.user()
	};
}, App);
