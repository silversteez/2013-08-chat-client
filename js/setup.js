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

var test;
$(document).ready(function(){

  var addFriend = function() {
    $("."+$(this).text()).addClass('friend');
  };

  var successCallback = function(data){
    console.log(data.results[1].text);

    var results = data.results;
    test = data.results;
    for (var i=0; i < results.length; i++){
      var $username = $('<div class="username"></div>');
      var name = results[i].username || "Anonymous";
      $username.text(name);
      $username.addClass(name);
      // Call addFriend (which adds bold class) if username clicked
      $username.click(addFriend);
      var $contents = $('<div></div>');
      $contents.text(results[i].text);
      $container = $("<div></div>");
      $container.append($username).append($contents);
      $("#chats").append($container);

      //var message = "<div>" + username + " : " + results[i].text + "</div>";

    }


  };
  var errorCallback = function(){
    console.log("error!!!");
  };

  $.ajax({
    type: "GET",
    url: "https://api.parse.com/1/classes/messages?order=-createdAt",
    success: successCallback,
    error: errorCallback
  });


// GRAB USERNAME

var globalUsername = window.location.search.split("=")[1];

var jsonSent = function(){};

var jsonNotSent = function(){console.log("JSON not sent.");};

//
  $(".enterMessage").submit(function(e){
    e.preventDefault();
    console.log(e);
    var data2 = JSON.stringify({
        username: globalUsername,
        text: $('.enterMessage').children().first().val()
      });
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "https://api.parse.com/1/classes/messages",
      data: data2,
      success: jsonSent,
      error: jsonNotSent
    });
  });

  // $('.username').on('click', function(e){
  //   console.log(e);
  //   console.log("testing...");
  // });


});































