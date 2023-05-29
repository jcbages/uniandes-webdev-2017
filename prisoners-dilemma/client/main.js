import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';


Meteor.startup(() => {
	WebFont.load({
		google: { families: ['Josefin Slab'] },
		active: () => {
			render(<App />, document.getElementById('render-target'));
		}
	});
});
