import { Meteor } from 'meteor/meteor';
import {Layer, Network} from 'synaptic';
import { ServiceConfiguration } from 'meteor/service-configuration';

import '../imports/api/compositions.js';
import '../imports/api/melodies.js';
import '../imports/api/users.js';

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
  	{ service: 'facebook' },
  	{
  		$set: {
  			clientId: Meteor.settings.clientId,
  			loginStyle: 'redirect',
  			secret: Meteor.settings.clientSecret
  		}
  	}
  )
});
