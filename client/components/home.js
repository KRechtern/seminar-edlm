Template.home.onCreated(function homeOnCreated() {
  Meteor.subscribe('questions');
  Meteor.subscribe('userdata');
});

Template.home.helpers({

  questions: function() {
    return Questions.find();
  },

  users: function() {
    return Meteor.users.find();
  },

  tempo: function() {
    var users = Meteor.users.find();
    if (!users) {
      return [];
    }
    var tempo = 5;
    var user;
    while (users.hasNext()) {
      user = users.next();
      //alert(user.slider[0]);
      //tempo = tempo + user.slider[0].tempo;
    }

    return tempo;
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
