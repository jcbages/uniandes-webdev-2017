import React, { Component } from 'react';

// About component - represents the explanation
export default class About extends Component {
	render() {
		return (
			<div id="about" className="row">
				<div className="col-md-7">
					<h2>About the game</h2>

					<p>
						You and your partner have been arrested and imprisioned.
						With lack of evidence to convict both, each of you has been
						given the opportunity to betray each other or remain silent.
						Depeding on your choices, the following outcomes can occur&hellip;
					</p>

					<ul>

						<li>
							<span className="bullet bullet-1" />
							A & B betray each other &mdash;&gt; A & B serve 2 years in prison
						</li>

						<li>
							<span className="bullet bullet-2" />
							A betrays B, B remains silent &mdash;&gt; A is set free, B serves 3 years in prison
						</li>

						<li>
							<span className="bullet bullet-3" />
							A & B remain silent &mdash;&gt; A & B serve 1 year in prison
						</li>

					</ul>
				</div>
			</div>
		);
	}
}
