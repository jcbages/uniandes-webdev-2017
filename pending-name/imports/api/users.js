import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish(null, function userPublication() {
		return Meteor.users.find(
			{ _id: this.userId },
			{ fields: { services: 1 }
		});
	});
}
