console.log("**reading js file");

// Function to check if the element exists
function checkElementExistence() {
  var overlayElement = document.querySelector(
    ".gsc-results-wrapper-overlay.gsc-results-wrapper-visible"
  );

  if (overlayElement) {
    // Element exists, perform your desired action here
    console.log("Element found!");
    // You can trigger an alert or execute any other code *******

    // ** hide unwanted sections:
    var hideElements = document.querySelector(".gsc-above-wrapper-area");
    hideElements.style.display = "none";
    // ** GET VIDEOS

    // Get all the div elements with the class "gsc-webResult gsc-result"
    var elements = document.querySelectorAll("div.gsc-webResult.gsc-result");

    // Iterate through each element
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      // Check if the structure and inner HTML content match the specified pattern
      var isValidElement =
        element.innerHTML.includes(
          'class="gs-title"><a class="gs-title" href="https://www.youtube.com/watch?'
        ) &&
        element.innerHTML.includes(
          'class="gs-bidi-start-align gs-visibleUrl gs-visibleUrl-short" dir="ltr">www.youtube.com</div>'
        ) &&
        element.innerHTML.includes(
          'class="gs-bidi-start-align gs-visibleUrl gs-visibleUrl-long" dir="ltr" style="word-break:break-all;">'
        );

      // Delete the element if it doesn't match the pattern
      if (!isValidElement) {
        element.parentNode.removeChild(element);
      }
    }

    // ** alert when a result is pressed:
    // Add a click event listener to each element
    // for (var i = 0; i < elements.length; i++) {
    //   var element = elements[i];

    //   element.addEventListener("click", function () {
    //     // alert("Div clicked!");
    //     console.log("Div clicked!");
    //   });
    // }
  }
}

// Function to be called when DOM changes
function handleDOMChanges() {
  // Check if the element exists initially
  checkElementExistence();

  // Use MutationObserver to listen for changes in the DOM
  var observer = new MutationObserver(function (mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.type === "childList") {
        // DOM has changed, check if the element exists
        checkElementExistence();
      }
    }
  });

  // Start observing the DOM changes
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

// Call the function to start checking for the element existence
handleDOMChanges();
