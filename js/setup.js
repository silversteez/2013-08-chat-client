if(!/(&|\?)username=/.test(window.location.search)){
  var newSearch = window.location.search;
  if(newSearch !== '' & newSearch !== '?'){
    newSearch += '&';
  }
  newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
  window.location.search = newSearch;
}

// Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});

// RETRIEVE CHATS:

$(document).ready(function(){

  var addFriend = function() {
    $("."+$(this).text()).addClass('friend');
  };

  var enterChatroom = function(){
    currentRoom = $(this).text();
    callAjax();
  };

  var currentRoom = "default";

  var onRecMessageData = function(data) {
    displayMessages(data);
    displayChatrooms(data);
  };

  var displayMessages = function(data){
    var results = data.results;
    for (var i=0; i < results.length; i++){
      if (currentRoom === "default" && !results[i].roomname) {
        displayMessage(results[i]);
      }
      else if (results[i].roomname && results[i].roomname === currentRoom) {
        displayMessage(results[i]);
      }
    }
  };

  var displayMessage = function(messageObj) {
    var $username = $('<div class="username"></div>');
      var name = messageObj.username || "Anonymous";
      $username.text(name);
      $username.addClass(name);
      // Call addFriend (which adds bold class) if username clicked
      $username.click(addFriend);
      var $contents = $('<div></div>');
      $contents.text(messageObj.text);
      $container = $("<div></div>");
      $container.append($username).append($contents);
      $("#chats").append($container);
  };
  // Check for chatroom

  var displayChatrooms = function(data){
    var results = data.results;
    var chatroomNames = {};

    for (var i=0; i < results.length; i++){
      if (results[i].roomname){
        chatroomNames[results[i].roomname] = true;
      }
    }
    for (var key in chatroomNames){
      var chatrooms = $("<li></li>");
      chatrooms.text(key);
      //enable click to enter chat functionality
      chatrooms.click(enterChatroom);
      $("#chatrooms").append(chatrooms);
    }

  };



  var getMessagesError = function(){
    console.log("error!!!");
  };

  var callAjax = function(){
    $("#chats").html("");
    $("#chatrooms").html("");
    $.ajax({
      type: "GET",
      url: "https://api.parse.com/1/classes/messages?order=-createdAt",
      success: onRecMessageData,
      error: getMessagesError
    });
  };


  callAjax();


// GRAB USERNAME

var globalUsername = window.location.search.split("=")[1];

var jsonNotSent = function(){console.log("JSON not sent.");};

//
  $(".enterMessage").submit(function(e){
    e.preventDefault();
    console.log(e);
    var data2 = {
        username: globalUsername,
        text: $('.enterMessage').children().first().val()
    };
    if (currentRoom !== "default"){
      data2.roomname = currentRoom;
    }
    data3 = JSON.stringify(data2);
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "https://api.parse.com/1/classes/messages",
      data: data3,
      error: jsonNotSent
    });
    callAjax();
    $('.enterMessage').children().first().val("");
  });

  $("#exitChatroom").click(function(){
    currentRoom = "default";
    callAjax();
  });

});































