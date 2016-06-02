Template.home.onCreated(function homeOnCreated() {
  Meteor.subscribe('questions');
});

Template.home.helpers({

  questions: function() {
    return Questions.find();
  }
});
