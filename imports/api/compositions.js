import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Compositions = new Mongo.Collection('compositions');

// Publish the compositions to their owners
if (Meteor.isServer) {
	Meteor.publish('compositions', function () {
		if (this.userId) {
			return Compositions.find({ owner: this.userId });
		}
	});
}

Meteor.methods({

	/* Save the given composition */
	'compositions.save'(data) {
		// Abort if not user
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		// Validate data
		check(data.name, String);
		check(data.playString, String);

		Compositions.insert({
			name: data.name,
			playString: data.playString,
			upvotes: 0,
			owner: this.userId
		});
	},

	/* Delete the composition with the given ID */
	'compositions.delete'(compositionId) {
		// Validate that the ID is in fact an string
		check(compositionId, String);

		// Find the composition & abort if not authorized
		let composition = Compositions.findOne(compositionId);
		if (composition.owner !== this.userId) {
			// If its another user session, abort process
			throw new Meteor.Error('not-authorized');
		}
		
		// Update the composition's upvotes
		Compositions.remove(composition._id);
	},

	/* Upvote the composition with the given ID */
	'compositions.upvote'(compositionId) {
		// Validate that the ID is in fact an string
		check(compositionId, String);

		// Find the composition & abort if not authorized
		let composition = Compositions.findOne(compositionId);
		if (composition.owner !== this.userId) {
			// If its another user session, abort process
			throw new Meteor.Error('not-authorized');
		}
		
		// Update the composition's upvotes
		Compositions.update(composition._id, { $set: {
			upvotes: composition.upvotes + 1,
		}});
	}

});
