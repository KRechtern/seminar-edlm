import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

});

Meteor.publish('questions', function questions() {
  return Questions.find();
})

Meteor.publish(null, function (){
  return Meteor.roles.find(this.userId, {fields: {role: 1}});
});
