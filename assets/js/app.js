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
    $('')
    var ref = database.ref('trains');
    var trainData = {
      name: 'Ashish Express',
      destination: 'DisneyLand',
      frequency: '30min',
      nextArrival:'now',
      minutesAway:'30'
    };

    ref.push(trainData);

    ref.on('value',getData,error);

    function getData(data){
      var data = data.val();
      // console.log(data);
      var key = Object.keys(data);
      // console.log(key);

      for(var i = 0; i < key.length; i++){

        console.log($('.table'));


        // var row = $('<tr>').addClass('line-'+i);
        var k = key[i];

        var name = data[k].name;
        var destination = data[k].destination;
        var frequency = data[k].frequency;
        var nextArrival = data[k].nextArrival;
        var minutesAway = data[k].minutesAway;

        $('#content').append('<tr><td>'+name+'</td><td>'+destination+'</td><td>'+frequency+'</td><td>'+nextArrival+'</td><td>'+minutesAway+'</td></tr>');

        // var elem = $('<td>').text(name).addClass('elements-of-'+i);

        // $('.line'+i).append(elem)
        // console.log($('.line'+i));
        // $('<td>').text(destination).addClass('.elements of '+i);
        // $('<td>').text(frequency).addClass('.elements of '+i);
        // $('<td>').text(nextArrival).addClass('.elements of '+i);
        // $('<td>').text(minutesAway).addClass('.elements of '+i);
        //
        // $('.line'+i).append('elements of'+i);

      }
    }
    function error(){
      console.log('error occured');
    }

});
