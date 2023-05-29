import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// Class definition
class Navbar extends Component {
	render() {
		/* Define button item */
		let button = (
			<AccountsUIWrapper />
		);

		if (this.props.currentUser) {
			button = (
				<button>
					@{this.props.currentUser.services.github.username}
				</button>
			);
		}

		/* Return render material */
		return (
			<div id="navbar" className="row">

				{/* Site title */}
				<div className="col-md-2 title">
					<p>Pending Name</p>
				</div>

				{/* Blank space */}
				<div className="col-md-9" />

				{/* Profile button */}
				<div className="col-md-1 profile">
					{button}
				</div>

			</div>
		);
	}
}

Navbar.propTypes = {
	currentUser: PropTypes.object
};

export default createContainer(() => {
	return {};
}, Navbar);
