var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

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

/*
  liveChart: function() {
    var tempoCount = 0;
    var interestCount = 0;
    var lostCount = 0;
    var users = Meteor.users.find();
    if (!users) return 0;
    users.forEach(function (user) {
      tempoCount += parseInt(user.slider[0].tempo, 10);
      interestCount += parseInt(user.slider[1].interest, 10);
      lostCount += parseInt(user.slider[2].lost, 10);
    });

    values = [{
      y: tempoCount,
      name: "Tempo"
    }, {
      y: interestCount,
      name: "Interest"
    }, {
      y: lostCount,
      name: "Lost"
    }];

    Meteor.defer(function() {
      Highcharts.chart('chart', {
        series: [{
          type: 'column',
          data: values
        }]
      });
    });
  },
  */

  tempo: function() {
    var tempo = 0;
    var users = Meteor.users.find();
    if (!users) return 0;
    users.forEach(function (user) {
      tempo += parseInt(user.slider[0].tempo, 10);
    });
    return tempo;
  },

  interest: function() {
    var interest = 0;
    var users = Meteor.users.find();
    if (!users) return 0;
    users.forEach(function (user) {
      interest += parseInt(user.slider[1].interest, 10);
    });
    return interest;
  },

  lost: function() {
    var lost = 0;
    var users = Meteor.users.find();
    if (!users) return 0;
    users.forEach(function (user) {
      lost += parseInt(user.slider[2].lost, 10);
    });
    return lost;
  }
});

Template.registerHelper('getTempo', function(users) {
  var tempo = 5;

  return tempo;
});

Template.home.events({
  'change #tempoSlider': function(event) {
    var sliderValue = event.currentTarget.value;

    Meteor.users.update (
      { _id: Meteor.userId() },
      { $set: {'slider.0.tempo': sliderValue} }
    );
  },

  'change #interestSlider': function(event) {
    var sliderValue = event.currentTarget.value;

    Meteor.users.update(
      { _id: Meteor.userId()},
      { $set: {'slider.1.interest': sliderValue}}
    );
  },

  'change #lostSlider': function(event) {
    var sliderValue = event.currentTarget.value;

    Meteor.users.update(
      {_id: Meteor.userId()},
      { $set: {'slider.2.lost': sliderValue}}
    );
  },

  'click #reset': function(event) {
    var users = Meteor.users.find();
    users.forEach(function (user) {
      Meteor.users.update(
        {_id: user._id},
        {$set: {
          'slider.0.tempo' : 0,
          'slider.1.interest': 0,
          'slider.2.lost': 0
        }}
      );
    });
  }
})
