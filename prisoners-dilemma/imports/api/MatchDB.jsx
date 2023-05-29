import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const Matches = new Mongo.Collection('Matches');

Meteor.methods({
    'matches.findMatch'(username) {
        let match = Matches.findOne({ user1: { $ne: null }, user2: null });
        if (match === undefined) {
            Matches.insert({
                user1: username,
                user2: null,
                decisionNumber: 0,
                decision1: -1,
                decision2: -1,
                score1: 0,
                score2: 0,
                lastMessage1: "",
                lastMessage2: "",
                left1: false,
                left2: false
            });
        } else {
            Matches.update({ _id: match._id }, { $set: { user2: username } });
        }
    },
    'matches.updateMatch'(matchId, username, decision) {
        let match = Matches.findOne({ _id: matchId });
        if (match.decisionNumber !== 10) {
            if (match.user1 === username) {
                match.decision1 = decision;
            } else {
                match.decision2 = decision;
            }
            if (match.decision1 === -1 || match.decision2 === -1) {
                Matches.update({ _id: matchId }, { $set: { decision1: match.decision1, decision2: match.decision2 } });
            } else {
                if (match.decision1 === 0 && match.decision2 === 0) {
                    //Both players cooperate
                    match.score1++;
                    match.score2++;
                    match.lastMessage1 = "You both remained silent!";
                    match.lastMessage2 = "You both remained silent!";
                } else if (match.decision1 === 1 && match.decision2 === 0) {
                    //A betrays B
                    match.score2 += 3;
                    match.lastMessage1 = "You betrayed your partner!";
                    match.lastMessage2 = "Your partner betrayed you!";
                } else if (match.decision1 === 0 && match.decision2 === 1) {
                    //B betrays A
                    match.score1 += 3;
                    match.lastMessage2 = "You betrayed your partner!";
                    match.lastMessage1 = "Your partner betrayed you!";
                } else {
                    //Both players betray each other
                    match.score1 += 2;
                    match.score2 += 2;
                    match.lastMessage1 = "You betrayed each other!";
                    match.lastMessage2 = "You betrayed each other!";
                }
                match.decisionNumber++;
                match.decision1 = -1;
                match.decision2 = -1;

                Matches.update({ _id: matchId }, {
                    $set: {
                        decisionNumber: match.decisionNumber,
                        decision1: match.decision1,
                        decision2: match.decision2,
                        score1: match.score1,
                        score2: match.score2,
                        lastMessage1: match.lastMessage1,
                        lastMessage2: match.lastMessage2
                    }
                });
                if (match.decisionNumber === 10) {
                    Meteor.call('users.addScore', match.user1, match.score1);
                    Meteor.call('users.addScore', match.user2, match.score2);
                }
            }
        }
    },
    'matches.leaveMatch'(matchId, username) {
        let match = Matches.findOne({ _id: matchId });
        if (match.decisionNumber === 10) {
            if (username === match.user1) {
                match.left1 = true;
            } else {
                match.left2 = true;
            }
        } else {
            if (username === match.user1 && !match.left2 && match.user2 !== null) {
                Meteor.call('users.addScore', match.user1, 30);
                match.left1 = true;
            } else if (username === match.user1) {
                match.left1 = true;
            } else if (username === match.user2 && !match.left1) {
                Meteor.call('users.addScore', match.user2, 30);
                match.left2 = true;
            } else {
                match.left2 = true;
            }
        }
        Matches.update({ _id: matchId }, {
            $set: {
                left1: match.left1,
                left2: match.left2
            }
        });
        if ((match.left1 && match.left2) || (match.left1 && match.user2 === null)){
            Matches.remove(matchId);
        }
    }
});
