import React, { Component } from 'react';

/* This is a single composition, like the ones shown in the my compositions view */
export default class Composition extends Component {

	/* Render the composition component + children (if any) */
	render() {
		return (
			<li>
				{/* Current composition information */}
				<p>Composition name: {this.props.composition.name}</p>
                <p>Upvotes: {this.props.composition.upvotes}</p>
				<p>Created at: {this.props.composition.createdAt}</p>

				{/* Functionality buttons (delete & edit) */}
				<button onClick={this.props.deleteComposition}>Delete composition</button>
			</li>
		)
	}

}