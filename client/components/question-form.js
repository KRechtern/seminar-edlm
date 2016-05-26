Template.questionForm.events({
  'submit form': function(event) {
    event.preventDefault();

    var newQuestion = {
      question: event.target.question.value,
      choices: [
        { text: event.target.choice1.value, votes: 0 },
        { text: event.target.choice2.value, votes: 0 }
      ]
    };

    Questions.insert(newQuestion);
  }
});
