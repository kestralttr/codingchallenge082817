
(function() {
  let baseUrl = "http://www.theimdbapi.org/api/";
  let method = "GET";
  let currentCollection = [];

  let requestTypes = {
    movieTitle:"find/movie?title=",
    person:"find/person?name=",
    movieID:"movie?movie_id=",
    personID:"person?person_id="
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
      $(".results-area").empty();
      data.forEach(function(obj) {
        displayMovie(obj, $(".results-area"));
      });
    })
    .fail(function(xhr) {
      return xhr;
    });
  }

  function displayMovie(movie, resultsArea) {
    resultsArea.append($("<div class='list-item'>" + movie.title + "</div>"));
  }

  $("document").ready(function() {
    let submitButton = $(".submit-button");
    let inputField = $(".input-field");
    let resultsArea = $(".results-area");
    $(".search-selector").first().css("color","red");

    submitButton.click(function(e) {
      e.preventDefault();
      makeRequest(inputField);
    });

    let searchSelectors = $(".search-selector");
    console.log(searchSelectors);
    let newRequestType;

    searchSelectors.click(function(e) {
      e.preventDefault();
      $(".search-selector").css("color","black");
      console.log($(this));
      $(this).css("color","red");
      newRequestType = e.target.dataset.requesttype;
      console.log(newRequestType);
      activeRequestType = requestTypes[newRequestType];
      console.log("activeRequestType: ", activeRequestType);
    });

  });

})();
