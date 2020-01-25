var config = {
    apiKey: "AIzaSyBuib9w9qRVx0KRBTzV4u9CUk7AwtZ-aPk",
    authDomain: "trainscheduler-edaa6.firebaseapp.com",
    databaseURL: "https://trainscheduler-edaa6.firebaseio.com",
    projectId: "trainscheduler-edaa6",
    storageBucket: "trainscheduler-edaa6.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train").on("click", function(event) {

    event.preventDefault();

    var TName= $("#trainname-input").val().trim();
    var TDest= $("#city-input").val().trim();
    var TTime= moment($("#time-input").val().trim(), "hh:mm");
    var TFreq= $("#freq-input").val().trim();


    var newEmp = {
        trainName: TName,
        destination: TDest,
        trainTime: TTime,
        frequency: TFreq
    };

    database.ref().push(newEmp);

    console.log(newEmp.trainName);
    console.log(newEmp.destination);
    console.log(newEmp.trainTime);
    console.log(newEmp.frequency);

    $("#trainname-input").val("");
    $("#city-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");
});

database.ref().on("child_added", function(chidSnaoshot){

    var empName = childSnapshot.val().trainName;
    var empDest = childSnapshot.val().destination;
    var empTime = childSnapshot.val().trainTime;
    var empFreq = childSnapshot.val().frequency;

    console.log(empName);
    console.log(empDest);
    console.log(empTime);
    console.log(empFreq);

    // var empStartPretty = moment.unix(empStart).format("hh:mm");

    // var empMins = moment().diff(moment(empStart, "X"), "mins");
    // console.log(empMins);

    // var empClock= empTime - empMins;
    // console.log(empClock);

    var newRow = $("<tr>").append(
        $("<td>").text(empName),
        $("<td>").text(empDest),
        $("<td>").text(empFreq),
        // $("<td>").text(empClock),
        // $("<td>").text(empMins)
    );

    $("#trainTable > tbody").append(newRow);
    

});