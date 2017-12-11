import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Compositions } from './compositions.js';

import { Random } from 'meteor/random'

export const Melodies = new Mongo.Collection('melodies');

/* Define how many melodies to publish/generate */
const LIM = 30, SUB_LIM = 10;

/* Generate a random integer between [min, max) */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return parseInt(Math.floor(Math.random() * (max - min)) + min);
}

// Publish the melodies in random way
if (Meteor.isServer) {
	Meteor.publish('melodies', function () {
		// Publish random LIM melodies
		Melodies.find({}, {
			skip: getRandomInt(1, 10),
			limit: SUB_LIM
		});
	});
}

Meteor.methods({

	/* Generate SUB_LIM random melodies */
	'melodies.loadMore'() {
		// Query compositions for random melodies

		// Query compositions for popular melodies

		// Query compositions for "smart" melodies

		// Generate the melodies
		for (let i = 0; i < SUB_LIM; ++i) {
			// Define the type of melody randomly
			let melodyType = getRandomInt(1, 4);

			// Based on the melody type, query compositions
		}
	}

});