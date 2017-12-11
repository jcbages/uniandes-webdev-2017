import React, { Component } from 'react';

/* This is a single composition, like the ones shown in the my compositions view */
export default class Composition extends Component {
	constructor(props){
		super(props);
		this.getColor = this.getColor.bind(this);
	}

	/* Get composition color */
	getColor() {
		switch(this.props.index % 7) {
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

	/* Render the composition component + children (if any) */
	render() {
		// Get div + button styles
		let divStyle = 'card ' + this.getColor() + ' darken-2';
		let buttonStyle = 'waves-effect waves-light btn ' + this.getColor() + 'white-text';

		return (
			<div className="col s12 m6">
				<div className={divStyle}>

					<div className="card-content white-text">
						<span className="card-title">{this.props.composition.name} </span>
						<p>Upvotes: {this.props.composition.upvotes}</p> 
					</div>

					<div className="card-action ">
						<a
						className={buttonStyle}
						onClick={this.props.deleteComposition(this.props.composition)}>
							Delete Composition
						</a>
					</div>

				</div>
		  </div>
		);
	}

}