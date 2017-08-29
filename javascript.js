
(function() {
  let baseUrl = "https://www.theimdbapi.org/api/";
  let method = "GET";
  let currentCollection = [];
  let modalContainer = $(".modal-container");
  let modal = $(".modal");
  let modalBackground = $(".modal-background");
  let modalTitle = $(".modal-title");
  let modalImage = $(".modal-image");
  let modalText = $(".modal-text");
  let item;
  let spinner = $(".spinner");

  let requestTypes = {
    movieTitle:"find/movie?title=",
    person:"find/person?name=",
    movieID:"movie?movie_id=",
    personID:"person?person_id="
  };

  // The activeRequestType refers to which API endpoint is set to be queried
  let activeRequestType = requestTypes.movieTitle;

  // A helper method to get the search params from the input field
  function getSearchParam(inputField) {
    // inputField must be a jQuery element
    return inputField.val();
  }

  // The function that makes a GET request to the IMDB API
  function makeRequest(inputField) {

    let searchParam = getSearchParam(inputField);
    if(searchParam === "") {
      return;
    }
    // URL is assembled for the AJAX request
    let finalUrl = baseUrl + activeRequestType + searchParam;
    // Activates spinner
    spinner.css("display","block");
    $.ajax({
      url: finalUrl,
      method: method
    })
    .done(function(data) {
      // Deactivates spinner
      spinner.css("display","none");
      // The ID search queries do not return arrays, and therefore should not be iterated through
      if(activeRequestType === requestTypes.movieID || activeRequestType === requestTypes.personID) {
        displayItem(data, $(".results-area"));
        $(".input-field").val("");
      } else {
        // The Movie and Person queries must be iterated through
        data.forEach(function(obj) {
          displayItem(obj, $(".results-area"));
        });
        $(".input-field").val("");
      }
    })
    .fail(function(xhr) {
      // Deactivates spinner
      spinner.css("display","none");
      console.log(xhr);
    });
  }

  // Causes modal to appear provided information
  function activateModal(title, imageUrl, text) {
    modalTitle.text(title);
    modalImage.css("background-image", "url('" + imageUrl + "')");
    modalText.text(text);
    modalContainer.css("display", "block");
  }

  // Item is displayed on click
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

    // Hides and clears modal when background is clicked
    modalBackground.click(function(e) {
      e.stopPropagation();
      modalContainer.css("display", "none");
      modalTitle.text("");
      modalImage.css("background-image", "none");
      modalText.text("");
    });

    // Listens for Submit button click in order to make HTTP request
    submitButton.click(function(e) {
      e.preventDefault();
      $(".results-area").empty();
      makeRequest(inputField);
    });

    let searchSelectors = $(".search-selector");
    let newRequestType;

    // Listens for clicks on search selectors and updates activeRequestType
    searchSelectors.click(function(e) {
      e.preventDefault();
      $(".search-selector").css("color","black");
      $(this).css("color","red");
      newRequestType = e.target.dataset.requesttype;
      activeRequestType = requestTypes[newRequestType];
    });

  });

})();
