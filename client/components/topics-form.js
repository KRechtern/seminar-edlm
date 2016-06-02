Template.topics.events({
  'submit form': function(event) {
    event.preventDefault();

    var lessonTopics = {
      date: event.target.date.value,
      topics: [
        { text: event.target.topic1.value, votes: 0 },
        { text: event.target.topic2.value, votes: 0 },
        { text: event.target.topic3.value, votes: 0 }
      ]
    };

    Questions.insert(lessonTopics);
  }
});
