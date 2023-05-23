// console.log("**reading js file");

// // window.google = google;

// // Initialize the PSE search element.
// var cse = new google.cse.SearchElement("cse-search");
// // console.log(cse);

// // Set the search engine ID.
// cse.setEngineId("c181a49ecc3cc4afa");

// // Set the search query.
// cse.setQuery("");

// // Set the search results limit.
// cse.setResultsLimit(10);

// // Set the search results filter.
// cse.setFilter("site=youtube.com&cat=music");

// // Set the search results sort order.
// cse.setSort("viewcount:desc");

// // Display the search results.
// cse.render();

// // Handle the click event on the search results.
// cse.addEventListener("resultClick", function (event) {
//   // Get the clicked result.
//   var result = event.result;

//   // Open the video link in a new tab.
//   window.open(result.link, "_blank");

//   // Create a preview overlay.
//   var previewOverlay = document.createElement("div");
//   previewOverlay.className = "gcse-search-result-preview";

//   // Add the video thumbnail to the preview overlay.
//   var thumbnail = document.createElement("img");
//   thumbnail.src = result.thumbnail;
//   previewOverlay.appendChild(thumbnail);

//   // Add the video title to the preview overlay.
//   var title = document.createElement("h2");
//   title.textContent = result.title;
//   previewOverlay.appendChild(title);

//   // Add the video description to the preview overlay.
//   var description = document.createElement("p");
//   description.textContent = result.description;
//   previewOverlay.appendChild(description);

//   // Add the preview overlay to the document body.
//   document.body.appendChild(previewOverlay);

//   // Handle the click event on the close button.
//   document
//     .querySelector(".gcse-search-result-preview .close-button")
//     .addEventListener("click", function () {
//       // Hide the preview overlay.
//       previewOverlay.style.display = "none";
//     });
// });

// // Handle the click event on the prev button.
// document
//   .querySelector(".gcse-search-results .prev-button")
//   .addEventListener("click", function () {
//     // Get the current page number.
//     var currentPage = parseInt(
//       document.querySelector(".gcse-search-results .page-number").textContent
//     );

//     // If the current page number is not 1, then go to the previous page.
//     if (currentPage > 1) {
//       currentPage--;

//       // Update the page number.
//       document.querySelector(".gcse-search-results .page-number").textContent =
//         currentPage;

//       // Fetch the search results for the current page.
//       cse.setPage(currentPage);
//       cse.render();
//     }
//   });

// // Handle the click event on the next button.
// document
//   .querySelector(".gcse-search-results .next-button")
//   .addEventListener("click", function () {
//     // Get the current page number.
//     var currentPage = parseInt(
//       document.querySelector(".gcse-search-results .page-number").textContent
//     );

//     // If the current page number is not the last page, then go to the next page.
//     if (currentPage < cse.getPages()) {
//       currentPage++;

//       // Update the page number.
//       document.querySelector(".gcse-search-results .page-number").textContent =
//         currentPage;

//       // Fetch the search results for the current page.
//       cse.setPage(currentPage);
//       cse.render();
//     }
//   });

// const container = document.getElementById("container");
// const overlay = document.querySelector(".gsc-results-wrapper-overlay.gsc-results-wrapper-visible");
// container.appendChild(overlay);

// // Get the button element
// var button = document.getElementsByClassName('gsc-search-button gsc-search-button-v2');

// // Define the function to be executed when the button is pressed
// function handleButtonClick() {
//   // Your code logic goes here
//   console.log("Button pressed!");
//   alert("Button pressed!");
//   // Call your function or perform any actions you want
// }

// // Attach an event listener to the button
// button.addEventListener('click', handleButtonClick);

//

// // Get all the elements with class gsc-webResult gsc-result
// var elements = document.getElementsByClassName('gsc-webResult gsc-result');

// // Loop through the elements in reverse order to safely remove them
// for (var i = elements.length - 1; i >= 0; i--) {
//   var element = elements[i];

//   // Check if the element's structure and content match the specified criteria
//   var isValid = (
//     element.innerHTML.includes('Lost [Official Music Video] - <b>Linkin Park</b> - YouTube') &&
//     element.innerHTML.includes('https://www.youtube.com/watch?v=7NK_JOkuSVY')
//   );

//   // If the element does not match the criteria, remove it
//   if (!isValid) {
//     element.parentNode.removeChild(element);
//   }
// }

//
// Function to check if the element exists
function checkElementExistence() {
  var overlayElement = document.querySelector(
    ".gsc-results-wrapper-overlay.gsc-results-wrapper-visible"
  );
  // var overlayElement = document.querySelector('.gsc-expansionArea');

  if (overlayElement) {
    // Element exists, perform your desired action here
    console.log("Element found!");
    // You can trigger an alert or execute any other code *******

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
