$(document).ready(function(){
  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBhbo1jrbjR4mO3o37nTDxd9arBjqRXE_o",
      authDomain: "train-scheduler-982e0.firebaseapp.com",
      databaseURL: "https://train-scheduler-982e0.firebaseio.com",
      projectId: "train-scheduler-982e0",
      storageBucket: "train-scheduler-982e0.appspot.com",
      messagingSenderId: "903855595570"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var ref = database.ref('trains');

$(document).on('click', '.submit', function(){

  $('.tableRow').empty();

  // TODO: Create a varaible that stores the next arrival and the minutes away values
  var trainData = {
    name: $('#name').val(),
    destination: $('#destination').val(),
    frequency: $('#frequency').val(),
    nextArrival:'now',
    minutesAway:'30'
  };

  $('#name, #destination, #frequency, #time').val('');

  ref.push(trainData);
})

    ref.on('value',getData,error);

    function getData(data){

      var data = data.val();
      // console.log(data);
      var key = Object.keys(data);
      // console.log(key);

      for(var i = 0; i < key.length; i++){

        console.log($('.table'));

        var k = key[i];

        var name = data[k].name;
        var destination = data[k].destination;
        var frequency = data[k].frequency;
        var nextArrival = data[k].nextArrival;
        var minutesAway = data[k].minutesAway;

        $('#content').append('<tr class="tableRow"><td>'+name+'</td><td>'+destination+'</td><td>'+frequency+'</td><td>'+nextArrival+'</td><td>'+minutesAway+'</td></tr>');

      }
    }
    function error(){
      console.log('error occured');
    }

});
