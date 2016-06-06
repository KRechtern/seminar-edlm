import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

});

Meteor.publish('questions', function questions() {
  return Questions.find();
});

Meteor.publish(null, function (){
  return Meteor.roles.find(this.userId, {fields: {role: 1}});
});

Meteor.publish(null, function() {
  return Meteor.users.find(this.userId, {fields: {slider: 1}});
});

Meteor.users.allow({
  update: function(userId, user, fields, modifier) {
    if (user._id === userId)
    {
      Meteor.users.update({_id: userId}, modifier);
      return true;
    }
    else return false;
  }
});
