import React, { Component } from 'react';

/* This is the navbar, with options for moving through the site */
export default class Navbar extends Component {

	/* Render the navbar component + children (if any) */
	render() {
		// Show/Hide buttons depending on if the user is logged or not
		let myCompositionsButton = null;
		let createCompositionButton = null;

		let logoutButton = null;
		let registerButton = <button onClick={this.props.register}>Enter now</button>;

		if (this.props.user) {
			myCompositionsButton = (
				<button onClick={this.props.changeView('myCompositions')}>
					My Compositions
				</button>
			);

			createCompositionButton = (
				<button onClick={this.props.changeView('createComposition')}>
					Create Composition
				</button>
			);

			logoutButton = (
				<button onClick={this.props.logout}>
					Logout
				</button>
			)

			registerButton = null;
		}

		return (
			<div>
				{/* This is the main title of the app */}
				<h1>Musical! An expression of art</h1>

				{/* These are the navigation buttons */}
				<button onClick={this.props.changeView('feed')}>Feed</button>
				{myCompositionsButton}
				{createCompositionButton}

				{registerButton}
				{logoutButton}
			</div>
		);
	}
}