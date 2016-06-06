Template.home.onCreated(function homeOnCreated() {
  Meteor.subscribe('questions');
});

Template.home.helpers({

  questions: function() {
    return Questions.find();
  },

  users: function() {
    return Meteor.users.find();
  }
});

Template.home.events({
  'change #tempoSlider': function(event) {
    var sliderValue = event.currentTarget.value;
    alert(sliderValue);

    Meteor.users.update (
      { _id: Meteor.userId() },
      { $set: {'slider.0.tempo': sliderValue} }
    );
  }
})
