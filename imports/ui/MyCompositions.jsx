import React, { Component } from 'react';

import Composition from './Composition.jsx';

/* This represents the my compositions component */
export default class MyCompositions extends Component {

	/* Render the my compositions component + children (if any) */
	render() {
		let compositions = this.props.compositions.map(
			(composition, index) => <Composition
				key={`composition-${index}`}
				user={this.props.user}
				composition={composition}
				deleteComposition={this.props.deleteComposition} />
		);

		return (
			<div className="feed">

				<h2>These are your compositions</h2>

				{/* This is the list of user's compositions */}
				<ul>{compositions}</ul>

			</div>
		);
	}

}