import React, { Component } from 'react';

// Footer component - represents the footer
export default class About extends Component {
	render() {
		return (
			<div id="footer" className="row">
				<div className="col-md-12">
					<p>
						This amazing social experiment was recreated for you
						by <span>@jcbages</span> & <span>@rjmantilla76</span>
					</p>
				</div>
			</div>
		);
	}
}
