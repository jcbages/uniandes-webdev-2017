import React, { Component } from 'react';

import './navbar.css';
/* This is the navbar, with options for moving through the site */
export default class Navbar extends Component {

	/* Render the navbar component + children (if any) */
	render() {
		// Show/Hide buttons depending on if the user is logged or not
		let myCompositionsButton = null;
		let createCompositionButton = null;

		let logoutButton = null;
		let registerButton = <button onClick={this.props.register}  className="waves-effect waves-light btn navbar-button">Enter now</button>;

		if (this.props.user) {
			myCompositionsButton = (
				<button onClick={this.props.changeView('myCompositions')}  className="waves-effect waves-light btn navbar-button"> 
					My Compositions
				</button>
			);

			createCompositionButton = (
				<button onClick={this.props.changeView('createComposition')}  className="waves-effect waves-light btn navbar-button">
					Create Composition
				</button>
			);

			logoutButton = (
				<button onClick={this.props.logout}  className="waves-effect waves-light btn navbar-button">
					Logout
				</button>
			)

			registerButton = null;
		}

		return (
			<div>
				<div className="w3-bar w3-theme w3-top w3-left-align w3-large navbar">
					{/* This is the main title of the app */}
					<h1 className="title">Musical! An expression of art</h1>
					
					
					{/* These are the navigation buttons */}

					<button onClick={this.props.changeView('feed')}  className="waves-effect waves-light btn navbar-button">Feed</button>
					{myCompositionsButton}
					{createCompositionButton}

					{registerButton}
					{logoutButton}
				</div>
			
			</div>
		);
	}
}