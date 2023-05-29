import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Class definition
class Console extends Component {
	constructor(props) {
		super(props);

		/* Bind JS function */
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.focusInput = this.focusInput.bind(this);
	}

	/* Focus input when mounted */
	componentDidMount() {
		this.focusInput();
	}

	/* Focus input */
	focusInput() {
		ReactDOM.findDOMNode(this.refs.input).focus();
	}

	/* Try to take action on the given command */
	processCommand(line) {
		switch (line) {
		case 'help':
			this.props.printHelp();
			break;
		case 'read':
			this.props.readChallenge();
			break;
		case 'request':
			this.props.requestChallenge();
			break;
		case 'link':
			this.props.printLink();
			break;
		case 'renew':
			this.props.requestLink();
			break;
		}
	}

	/* Handle enter key press */
	handleKeyPress(event) {
		if (event.key == 'Enter') {
			// Process command line
			this.props.printLine(`\$ ${event.target.value}`);
			this.processCommand(event.target.value);
			event.target.value = '';
		}
	}

	/* Return render material */
	render() {
		let consoleContent = this.props.consoleContent.map((line, index) => (
			<p key={`line-${index}`}>{line}</p>
		));

		return (
			<div
				id="console"
				className="col-md-10"
			>
				{consoleContent}
				{'$ '}
				<input
					type="text"
					ref="input"
					aria-label="Console Input"
					maxLength="50"
					onKeyPress={this.handleKeyPress}
				/>
			</div>
		);
	}
}

Console.propTypes = {
	currentUser: PropTypes.object,
	content: PropTypes.array
};

export default createContainer(() => {
	return {};
}, Console);
