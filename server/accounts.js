import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function(options, user) {
  user.roles = "normal";
  var slider = [
    {tempo: 0},
    {interest: 0},
    {lost: 0}
  ];
  user.slider = slider;

  if (options.profile)
    user.profile = options.profile;
  return user;
});

Meteor.users.allow({
  update: function (userId, doc, fields, modifier) {
    return true;
  }
})
