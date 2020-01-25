$(document).ready(function(){


    var config = {
        apiKey: "AIzaSyBuib9w9qRVx0KRBTzV4u9CUk7AwtZ-aPk",
        authDomain: "trainscheduler-edaa6.firebaseapp.com",
        databaseURL: "https://trainscheduler-edaa6.firebaseio.com",
        projectId: "trainscheduler-edaa6",
        storageBucket: "trainscheduler-edaa6.appspot.com",
    };
    
    firebase.initializeApp(config);
    var dataRef = firebase.database();
    
    var TName = "";
    var TDest = "";
    var TTime = "";
    var TFreq = "";

    var currentTime = moment().format();

    $("#add-train").on("click", function (event) {
    
        event.preventDefault();
    
        TName= $("#trainname-input").val().trim();
        TDest= $("#city-input").val().trim();
        TTime= moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
        TFreq= $("#freq-input").val().trim();
    
    
        var newTrain = {
            trainName: TName,
            destination: TDest,
            trainTime: TTime,
            frequency: TFreq,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        };
    
        dataRef.ref().push(newTrain);
    
        $("#trainname-input").val("");
        $("#city-input").val("");
        $("#time-input").val("");
        $("#freq-input").val("");
    });
    
    dataRef.ref().on("child_added", function (childSnapshot){
    
        var empName = childSnapshot.val().trainName;
        var empDest = childSnapshot.val().destination;
        var empTime = childSnapshot.val().trainTime;
        var empFreq = childSnapshot.val().frequency;
    
        var timePretty = moment(empTime, "HH:mm");
    
        var timeDiff = moment().diff(moment(timePretty), "minutes");

        var freqMins = childSnapshot.val().frequency;

        var minAway = Math.abs(timeDiff % freqMins);

        var nextArr = moment(currentTime).add(minAway, "minutes").format("hh:mm A");
       
        var newRow = $("<tr>").append(
            $("<td>").text(empName),
            $("<td>").text(empDest),
            $("<td>").text(empFreq),
            $("<td>").text(nextArr),
            $("<td>").text(minAway),
        );
    
        $("#trainTable > tbody").append(newRow);
        
    
    });
})
