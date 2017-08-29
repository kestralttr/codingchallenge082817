
(function() {

  function makeRequest() {
    console.log("request is made!");
  }

  $("document").ready(function() {
    let submitButton = $(".submit-button");

    submitButton.click(function(e) {
      e.preventDefault();
      makeRequest();
    });


  });

})();
