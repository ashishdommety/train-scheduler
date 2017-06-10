$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBhbo1jrbjR4mO3o37nTDxd9arBjqRXE_o",
    authDomain: "train-scheduler-982e0.firebaseapp.com",
    databaseURL: "https://train-scheduler-982e0.firebaseio.com",
    projectId: "train-scheduler-982e0",
    storageBucket: "train-scheduler-982e0.appspot.com",
    messagingSenderId: "903855595570"
  };
  //intializes the app with the whole configuration
  firebase.initializeApp(config);

  var database = firebase.database();
  //
  var nextArrival,minutesAway = 0;

  $(document).on('click', '.submit, .delete', function() {
    if($(this).hasClass('submit')){
      var name = $('#name').val().trim();
      var destination = $('#destination').val().trim();
      var frequency = $('#frequency').val().trim();
      var initialTrainTime = $('#initTrainTime').val().trim();

      var trainData = {
        name: name,
        destination: destination,
        frequency: frequency,
        initialTrainTime: initialTrainTime
      };

      $('#name, #destination, #frequency, #initTrainTime').val('');

      database.ref('trains/' + name).set(trainData);
    }
    else if($(this).has('.delete')){
      //deleting from the database
      var rowID = $(this).parent().parent().attr('id');
      database.ref('trains').child(rowID).remove();
      //deleting from the document
      $(this).parent().parent().remove();
    }

  });

  database.ref().on('value', getData, error);

  function getData(data) {
    $('.tableRow').empty();

    var data = data.val();
    // console.log('data: '+ data);

    if(data === null){
      console.log('Enter train details');
    }
    else{
      var key = Object.keys(data.trains);

      for (var i = 0; i < key.length; i++) {
        var k = key[i];

        //gets the start time of the train in object form so that it can be manipulated with
        //the diff function
        var convertedTime = moment(parseInt(data.trains[k].initialTrainTime), 'HH:mm');
        console.log(convertedTime);

        //difference between start time and current time in minutes
        var difference = moment().diff(moment(convertedTime),'minutes');
        console.log('difference: '+ difference);

        //dividing the difference in time by the frequency
        var remainder = difference % parseInt(data.trains[k].frequency);
        console.log('remainder:' + remainder);

        //the number of minutes away is the frequency minus the remainder
        var minutesAway = parseInt(data.trains[k].frequency) - remainder;

        //add the minutes away to the current moment to get the next arrival
        var nextArrival = moment().add(minutesAway, "minutes");
        nextArrival = moment(nextArrival).format("HH:mm");
        console.log('next arrival:' + nextArrival);

        var name = data.trains[k].name;
        var destination = data.trains[k].destination;
        var frequency = data.trains[k].frequency;
        var startTime = data.trains[k].initialTrainTime;
        console.log('start time: ' + startTime );

        var trainColumns = '<td>' + name + '</td>'+
                            '<td>' + destination + '</td>'+
                            '<td>'+ startTime+'</td>'+
                            '<td>' + frequency + '</td>'+
                            '<td>'+ nextArrival+'</td>'+
                            '<td>'+ minutesAway+'<button class="delete">x</button></td>';

        var trainRow = $('<tr>');
        trainRow.addClass('tableRow')
            .attr('id', name)
            .append(trainColumns);

        $('#content').append(trainRow);
      }
    }
  }

  function error(error) {
    console.log(error.code);
  }

});
