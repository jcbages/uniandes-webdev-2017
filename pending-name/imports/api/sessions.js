import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Sessions = new Mongo.Collection('sessions');

if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('sessions', function sessionPublication () {
		if (this.userId) {
			return Sessions.find({
				$or: [
					{ 'p1.userId': this.userId },
					{ 'p2.userId': this.userId },
				],
				status: { $ne: 'ended' }
			});
		}
	});
}

function getRandomChallenge(oldStatement) {
	let statement1 = (
		'Suppose we could access yesterday\'s stock prices as a list, where:.' +
		'* The indices are the time in minutes past trade opening time, which was 9:30am local time.' +
		'* The values are the price in dollars of Apple stock at that time.' +
		'So if the stock cost $500 at 10:30am, stock_prices_yesterday[60] = 500.' +
		'Write an efficient function that takes stock_prices_yesterday and returns ' +
		'the best profit I could have made from 1 purchase and 1 sale of 1 Apple stock yesterday'
	);

	let statement2 = (
		'Write a function get_products_of_all_ints_except_at_index() that takes' +
		'a list of integers and returns a list of the products:.' +
		'For example, given: [1, 7, 3, 4].' +
		'your function would return: [84, 12, 28, 21].' +
		'by calculating: [7 * 3 * 4,  1 * 3 * 4,  1 * 7 * 4,  1 * 7 * 3]'
	);

	return { statement: (oldStatement === statement1) ? statement2 : statement1 };
}

function getHangoutsLink(oldHangouts) {
	let hangouts1 = 'https://hangouts.google.com/call/Woi0pQAocsKxQZtVyegDAAEE';
	let hangouts2 = 'https://hangouts.google.com/call/Xfgl6fBLMlaT_iZXpIUqAAEE';

	return (oldHangouts === hangouts1) ? hangouts2 : hangouts1;
}

Meteor.methods({
	'sessions.start'() {
		// Make sure the user is logged in before inserting a task
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		// Close any other exising session
		Sessions.update({
			$or: [
				{ 'p1.userId': Meteor.userId() },
				{ 'p2.userId': Meteor.userId() }
			]
		}, { $set: {
			end: new Date(),
			status: 'ended'
		}});

		// Check if there is any available session to join
		const session = Sessions.findOne({
			status: 'waiting',
			'p1.userId': { $ne: Meteor.userId() }
		});

		// Join the session & add a new challenge & add hangouts url
		if (session) {
			Sessions.update(session._id, { $set: {
				p2: {
					userId: Meteor.userId(),
					username: Meteor.user().services.github.username,
					rating: 5
				},
				start: new Date(),
				hangouts: getHangoutsLink(''),
				challenge: getRandomChallenge(''),
				status: 'online'
			}});
			return;
		}

		// No waiting session was found, create a new waiting one
		Sessions.insert({
			p1: {
				userId: Meteor.userId(),
				username: Meteor.user().services.github.username,
				rating: 5
			},
			status: 'waiting',
			createdAt: new Date()
		});
	},
	'sessions.end'(sessionId) {
		check(sessionId, String);

		const session = Sessions.findOne(sessionId);
		if (session.p1.userId !== Meteor.userId() && (!session.p2 || session.p2.userId !== Meteor.userId())) {
			// If its another user session, abort process
			throw new Meteor.Error('not-authorized');
		}
		
		Sessions.update(session._id, { $set: {
			end: new Date(),
			status: 'ended'
		}});
	},
	'sessions.requestChallenge'(sessionId) {
		check(sessionId, String);

		const session = Sessions.findOne(sessionId);
		if (session.p1.userId !== Meteor.userId() && (!session.p2 || session.p2.userId !== Meteor.userId())) {
			// If its another user session, abort process
			throw new Meteor.Error('not-authorized');
		}

		// Make sure its online
		if (session.status !== 'online') {
			throw new Meteor.Error('not-online');
		}

		Sessions.update(session._id, { $set: {
			challenge: getRandomChallenge(session.challenge.statement)
		}});
	},
	'sessions.requestLink'(sessionId) {
		check(sessionId, String);

		const session = Sessions.findOne(sessionId);
		if (session.p1.userId !== Meteor.userId() && (!session.p2 || session.p2.userId !== Meteor.userId())) {
			// If its another user session, abort process
			throw new Meteor.Error('not-authorized');
		}

		// Make sure its online
		if (session.status !== 'online') {
			throw new Meteor.Error('not-online');
		}

		Sessions.update(session._id, { $set: {
			hangouts: getHangoutsLink(session.hangouts)
		}});
	},
});
