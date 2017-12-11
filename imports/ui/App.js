import React, { Component } from 'react';

import Navbar from './Navbar.jsx';
import Feed from './Feed.jsx'
import MyCompositions from './MyCompositions.jsx';
import MelodyBox from './MelodyBox.jsx';
import SoundMagic from './SoundMagic';
import Tone from 'tone';

import './App.css';
/* This is the main/root component, everything begins here */
export default class App extends Component {

	/* Initialize evetyhing that needs to be initialized */
	constructor(props) {
		super(props);

		// Define the component mutable state
		// TODO: Move user + melodies + compositions to props
		this.state = {
			view: 'feed',
			user: null,
			melodies: [
				{ _id: '1', type: 1, ids: ['1', '2'] },
				{ _id: '2', type: 2, ids: ['1', '4'] },
				{ _id: '3', type: 3, ids: ['2', '8'] }
			],
			compositions: [
				{ _id: '1', name: 'Faena de una noche de verano', createdAt: 987654321234, upvotes: 5 },
				{ _id: '2', name: 'Esa sensación que me da ver tus ojos', createdAt: 987654321291, upvotes: 7 },
				{ _id: '4', name: 'Sólo podría describirte como una leve incomodidad', createdAt: 987654343833, upvotes: 8 },
				{ _id: '8', name: 'Ludovico en Audi', createdAt: 987654329982, upvotes: 9 }
			],
			playingMelody: undefined
		};

		// Bind function's scope so they can be used by other components
		this.changeView = this.changeView.bind(this);
		this.loadMoreMelodies = this.loadMoreMelodies.bind(this);

		this.playMelody = this.playMelody.bind(this);
		this.stopMelody = this.stopMelody.bind(this);
		this.isPlayingMelody = this.isPlayingMelody.bind(this);
		this.upvoteMelody = this.upvoteMelody.bind(this);
		
		this.deleteComposition = this.deleteComposition.bind(this);

		this.register = this.register.bind(this);
		this.logout = this.logout.bind(this);

		this.saveComposition = this.saveComposition.bind(this);
		this.currentSM = null;

		this.synth =  new Tone.PolySynth(6, Tone.Synth, {
			"oscillator" : {
				"partials" : [0, 2, 3, 4],
			}
		}).toMaster();
		Tone.Transport.start();
	}

	/* Change the view for the given one */
	changeView(view) {
		return () => this.setState({ view: view });
	}

	/* Start playing the given melody & stop any other currentlly playing melody (if any) */
	playMelody(melody) {
		if(this.currentSM !== null){
			this.currentSM.stop();
		}
		// For now Burn baby burn
		if (melody.type === 1) {
			this.currentSM = new SoundMagic(['000000010010011100101000000100000100010001100000001010010001000000110100000100101001001110001100111100000010000100000010000001000010000000001110000100010100000000100000']
										,this.synth);
		} else if (melody.type === 2) {
			this.currentSM = new SoundMagic(['100000000001010000000000000100001001000001000100001000000010000001000101000000000101100000000000000000000001000100001000000000000000000000010000100010000100000000010000'],
							this.synth);
		} else {
			this.currentSM = new SoundMagic(['000001000000000000000010000100000010000001000000000000000000000001000100000100000001000000000100000000000000000100000001000000000100000000000100000001000000000010000000'],
							this.synth);
		}

		
		this.currentSM.start();
		this.setState({ playingMelody: melody });
		// With the way currentSM works there should be only one loop running without callbacks or anything
		/*return () => {

			this.stopMelody(() => {
				console.log(`playing melody type ${melody.type} tururururu`);
				
			});
		}*/
	}

	/* Stop playing the currently playing melody (if any) */
	stopMelody(cb) {
		// TODO: Really stop the melody
		this.currentSM.stop();
		this.setState({ playingMelody: undefined }, cb);
	}

	/* Check if the given melody is currently playing */
	isPlayingMelody(melody) {
		return this.state.playingMelody === melody;
	}

	/* Increase by one the number of upvotes for the given melody */
	upvoteMelody(melody) {
		return () => {
			// TODO: Really upvote the melody
			console.log(`upvoting melody type ${melody.type} wujules`);
			for (let i = 0; i < this.state.compositions.length; ++i) {
				let _id = this.state.compositions[i]._id;
				if (_id === melody.ids[0] || _id === melody.ids[1]) {
					this.state.compositions[i].upvotes += 1;
				}
			}
			this.setState(prevState => ({ compositions: prevState.compositions }));
		}
	}

	/* Register or login some user using oauth */
	register() {
		console.log('registering user, redirecting to oauth target...');
		this.setState({ user: {} });
	}

	/* Logout from the current user account */
	logout() {
		console.log('logout :(');
		this.setState({ user: null, view: 'feed' });
	}

	/* Delete the given composition */
	deleteComposition(composition) {
		return () => {
			// TODO: Really delete de composition
			console.log('Deleting composition bubububu :(');
		}
	}

	/* Load/Generate more melodies */
	loadMoreMelodies() {
		// TODO: Load more melodies
		console.log('Loading more melodies');
		let melodies = this.state.melodies;
		for (let i = 0; i < 3; ++i) {
			melodies.push({ type: i + 1, ids: ['4', '1'] });
		}
		this.setState({ melodies: melodies });
	}
	saveComposition(){
		return ((composition)=>{
			//DO MONGO STUFF
			// No se si deba cambiar el view, yo creo que s\'i
		});
	}

	componentWillUnmount(){
		//FAILSAFE
		if(this.currentSM !== null){
			this.currentSM.stop();
		}
	}
	
	/* Render the app component + children (if any) */
	render() {
		let content;
		if (this.state.view === 'feed') {
			content = <Feed  
				user={this.state.user} 					// TODO: Change to props
				melodies={this.state.melodies}	// TODO: Change to props
				playMelody={this.playMelody}
				stopMelody={this.stopMelody}
				isPlayingMelody={this.isPlayingMelody}
				upvoteMelody={this.upvoteMelody}
				loadMoreMelodies={this.loadMoreMelodies} />;
		} else if (this.state.view === 'myCompositions') {
			content = <MyCompositions 
				user={this.state.user}									// TODO: Change to props
				compositions={this.state.compositions}	// TODO: Change to props
				deleteComposition={this.deleteComposition} />;
		} else if (this.state.view === 'createComposition') {
			content = <MelodyBox 
							editable = {true} 
							saveFunction = {this.saveComposition()}/>;
		}

		return (
			<div className = 'App'>

				<Navbar 
					user={this.state.user}
					changeView={this.changeView}
					register={this.register}
					logout={this.logout} />

				{content}

			</div>
		);
	}

}