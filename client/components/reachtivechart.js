var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

Template.reactiveChart.onCreated(function reactiveChartCreated() {
  var self = this;
  self.autorun(function() {
    self.subscribe('userdata');
  });
});


Template.reactiveChart.onRendered(function () {
  var users = Meteor.users.find();
  alert(users);
  var initializing = true;
  var liveChart;
  var tempoCount = 0;
  var interestCount = 0;
  var lostCount = 0;

  users.forEach(function (user) {
    tempoCount += parseInt(user.slider[0].tempo, 10);
    interestCount += parseInt(user.slider[1].interest, 10);
    lostCount += parseInt(user.slider[2].lost, 10);
  });

/*
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

  var cursor = Template.currentData();
  liveChart = Highcharts.chart(cursor.chart_id, {
    series: [{
      type: 'column',
      data: values
    }]
  });
  */

  values = [{
    type: 'column',
    name: 'Tempo',
    data: {
      y: tempoCount,
      name: 'Tempo'
    }
  },
  {
    type: 'column',
    name: 'Interesse',
    data: {
      y: interestCount,
      name: 'Interesse'
    }
  },
  {
    type: 'column',
    name: 'Verständnis',
    data: {
      y: lostCount,
      name: 'Verständnis'
    }
  }];

  var cursor = Template.currentData();
  liveChart = Highcharts.chart(cursor.chart_id, {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Schüler Feedback'
    },
    xAxis: {
      categories: ['Schüler']
    },
    series: [{
      name: 'Tempo',
      data: [tempoCount],
      negativeColor: '#FF0000'
    }, {
      name: 'Interesse',
      data: [interestCount],
      negativeColor: '#FF0000'
    }, {
      name: 'Verständnis',
      data: [lostCount],
      negativeColor: '#FF0000'
    }]
  });

  users.observeChanges({
    changed: function() {
      if (!initializing) {
        var tempoCount = 0;
        var interestCount = 0;
        var lostCount = 0;
        users.forEach(function (user) {
          tempoCount += parseInt(user.slider[0].tempo, 10);
          interestCount += parseInt(user.slider[1].interest, 10);
          lostCount += parseInt(user.slider[2].lost, 10);
        });
        liveChart.series[0].data[0].update(tempoCount);
        liveChart.series[1].data[0].update(interestCount);
        liveChart.series[2].data[0].update(lostCount);
      }
    }
  });
  initializing = false;
})
