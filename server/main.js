import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  if (Questions.find().count() === 0) {

    var sampleQuestions = [
      {
        question: 'Wie groß ist ein Affe?',
        choices: [
          { text: '1 Meter', votes: 0 },
          { text: '2 Meter', votes: 0 }
        ]
      },
      {
        question: 'Gefällt dir diese App?',
        choices: [
          { text: 'Auf jeden!', votes: 0 },
          { text: 'Klar', votes: 0 }
        ]
      }
    ];

    _.each(sampleQuestions, function(question) {
      Questions.insert(question);
    });
  }
});
