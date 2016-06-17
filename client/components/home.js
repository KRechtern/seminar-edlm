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
  },

  tempoCounts: function() {
    var count = {
      negTempo: 0,
      posTempo: 0,
      posInterest: 0,
      negInterest: 0,
      posLost: 0,
      negLost: 0
    };
    var users = Meteor.users.find();
    if (!users) return 0;
    users.forEach(function (user) {
      var valueTempo = parseInt(user.slider[0].tempo, 10);
      var valueInterest = parseInt(user.slider[1].interest, 10);
      var valueLost = parseInt(user.slider[2].lost, 10);
      if (valueTempo < 0) {
        count.negTempo = count.negTempo + 1;
      } else {
        count.posTempo = count.posTempo + 1;
      }
      if (valueInterest < 0) {
        count.negInterest = count.negInterest + 1;
      } else {
        count.posInterest = count.posInterest + 1;
      }
      if (valueLost < 0) {
        count.negLost = count.negTempo + 1;
      } else {
        count.posLost = count.posLost + 1;
      }
    });

    return count;
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
