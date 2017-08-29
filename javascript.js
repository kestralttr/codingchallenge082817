
(function() {
  let baseUrl = "http://www.theimdbapi.org/api/";
  let method = "GET";

  let requestTypes = {
    movieTitle:"find/movie?title=",
    person:"find/person?name=",
    movieID:"movie?movie_id=",
    actorID:"person?person_id="
  };

  let activeRequestType = requestTypes.movieTitle;

  function getSearchParam(inputField) {
    // inputField must be a jQuery element
    return inputField.val();
  }

  function makeRequest(inputField) {

    let searchParam = getSearchParam(inputField);
    console.log("searchParam: ", searchParam);
    if(searchParam === "") {
      console.log("SEARCHPARAM IS EMPTY!");
      return;
    }

    let finalUrl = baseUrl + activeRequestType + searchParam;
    console.log("finalUrl: ", finalUrl);

    $.ajax({
      url: finalUrl,
      method: method
    })
    .done(function(data) {
      console.log("IMBD data returned");
      console.log(data);
    })
    .fail(function(xhr) {
      return xhr;
    });
  }

  $("document").ready(function() {
    let submitButton = $(".submit-button");
    let inputField = $(".input-field");

    submitButton.click(function(e) {
      e.preventDefault();
      makeRequest(inputField);
    });


  });

})();
