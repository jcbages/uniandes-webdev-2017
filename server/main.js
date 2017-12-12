import { Meteor } from 'meteor/meteor';
import {Layer, Network} from 'synaptic';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { Inject } from "meteor/meteorhacks:inject-initial";


import '../imports/api/compositions.js';
import '../imports/api/melodies.js';
import '../imports/api/users.js';


Meteor.startup(() => {
  
    // add HTML Lang 
  Inject.rawModHtml("addLanguage", function(html) {
    return html.replace(/<html>/, '<!-- HTML 5 -->\n<html lang="en">');
  });
  
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
