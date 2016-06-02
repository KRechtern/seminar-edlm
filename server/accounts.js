import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function(options, user) {
  user.roles = "normal";

  if (options.profile)
    user.profile = options.profile;
  return user;
});
