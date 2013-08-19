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

var test;
$(document).ready(function(){
  var successCallback = function(data){
    console.log(data.results[1].text);

    var results = data.results;
    test = data.results;
    for (var i=0; i < results.length; i++){
      var $username = $('<div class="username"><strong></strong></div>');
      if (!results[i].username){
        $username.text('Anonymous');
      } else {
        $username.text(results[i].username);
      }
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
    Type: "GET",
    url: "https://api.parse.com/1/classes/messages",
    success: successCallback,
    error: errorCallback
  });
});