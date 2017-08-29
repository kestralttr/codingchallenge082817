
(function() {
  let baseUrl = "http://www.theimdbapi.org/api/";
  let method = "GET";
  let currentCollection = [];
  let modalContainer = $(".modal-container");
  let modal = $(".modal");
  let modalBackground = $(".modal-background");
  let modalTitle = $(".modal-title");
  let modalImage = $(".modal-image");
  let modalText = $(".modal-text");
  let item;

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
      console.log("data: ", data);
      if(activeRequestType === requestTypes.movieID || activeRequestType === requestTypes.personID) {
        displayItem(data, $(".results-area"));
      } else {
        data.forEach(function(obj) {
          displayItem(obj, $(".results-area"));
        });
      }
    })
    .fail(function(xhr) {
      return xhr;
    });
  }

  function activateModal(title, imageUrl, text) {
    modalTitle.text(title);
    modalImage.css("background-image", "url('" + imageUrl + "')");
    modalText.text(text);
    modalContainer.css("display", "block");
  }

  function displayItem(object, resultsArea) {
    item = $("<div class='list-item'>" + object.title + "</div>");
    if(activeRequestType === requestTypes.movieTitle || activeRequestType === requestTypes.movieID) {
      item.click(function(e) {
        activateModal(object.title, object.poster.large, object.description);
      });
    } else {
      item.click(function(e) {
        activateModal(object.title, object.image.poster, object.description);
      });
    }
    resultsArea.append(item);
  }

  $("document").ready(function() {
    let submitButton = $(".submit-button");
    let inputField = $(".input-field");
    let resultsArea = $(".results-area");
    $(".search-selector").first().css("color","red");

    modalBackground.click(function(e) {
      e.stopPropagation();
      console.log("trying to close modal");
      modalContainer.css("display", "none");
    });

    submitButton.click(function(e) {
      e.preventDefault();
      $(".results-area").empty();
      makeRequest(inputField);
    });

    let searchSelectors = $(".search-selector");
    console.log(searchSelectors);
    let newRequestType;

    searchSelectors.click(function(e) {
      e.preventDefault();
      $(".search-selector").css("color","black");
      $(this).css("color","red");
      newRequestType = e.target.dataset.requesttype;
      activeRequestType = requestTypes[newRequestType];
      console.log("activeRequestType: ", activeRequestType);
    });

  });

})();
