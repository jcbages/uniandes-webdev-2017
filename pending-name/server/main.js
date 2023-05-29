import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

import '../imports/api/sessions.js';
import '../imports/api/users.js';

Meteor.startup(() => {
  // code to run on server at startup
  ServiceConfiguration.configurations.upsert(
  	{ service: 'github' },
  	{
  		$set: {
  			clientId: Meteor.settings.clientId,
  			loginStyle: 'redirect',
  			secret: Meteor.settings.clientSecret
  		}
  	}
  )
});
