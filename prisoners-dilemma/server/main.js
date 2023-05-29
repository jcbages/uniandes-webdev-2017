import { Meteor } from 'meteor/meteor';
import '../imports/api/UsersDB.jsx';
import '../imports/api/MatchDB.jsx';
import '../imports/startup/FacebookLogin.jsx';

let connectHandler = WebApp.connectHandlers;

Meteor.startup(() => {
  // code to run on server at startup
	connectHandler.use(function (req, res, next) {
		res.setHeader('Strict-Transport-Security', 'max-age=2592000; includeSubDomains'); // 2592000s / 30 days
		return next();
	});
});
