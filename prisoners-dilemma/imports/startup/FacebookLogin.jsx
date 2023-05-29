import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Users } from '../api/UsersDB.jsx'

if (Meteor.isServer) {
    Meteor.startup(() => {
        ServiceConfiguration.configurations.remove({
            service: "facebook"
        });

        ServiceConfiguration.configurations.insert({
            service: "facebook",
            appId: process.env.APP_ID,
            secret: process.env.APP_SECRET
        });
    });
}

Accounts.onCreateUser((options, user) => {
    if (!user.services.facebook) {
        return user;
    }
    user.facebookId = user.services.facebook.id;
    user.name = user.services.facebook.first_name;
    user.username = user.services.facebook.id;
    Meteor.call('users.tryAddUser', user.facebookId, user.name);
    return user;
});
