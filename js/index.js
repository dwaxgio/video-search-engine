console.log("**reading js file");

// Function to check if the element exists
function checkElementExistence() {
  var overlayElement = document.querySelector(
    ".gsc-results-wrapper-overlay.gsc-results-wrapper-visible"
  );

  if (overlayElement) {
    // Check if the action has already been performed
    if (overlayElement.dataset.actionPerformed === "true") {
      return; // Exit the function if action has already been performed
    }

    // Mark the action as performed
    overlayElement.dataset.actionPerformed = "true";

    // Perform your desired action here
    console.log("Element found!");
    // ************* You can trigger an alert or execute any other code *******
    document
      .querySelector(".gsc-results-wrapper-overlay.gsc-results-wrapper-visible")
      .classList.remove("gsc-results-wrapper-overlay");

    // ** hide unwanted sections:
    var hideElements = document.querySelector(".gsc-above-wrapper-area");
    hideElements.style.display = "none";

    // const youtubeWatch = document.querySelector(
    //   ".gs-bidi-start-align gs-visibleUrl.gs-visibleUrl-breadcrumb"
    // );

    // youtubeWatch.style.display = "none";
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
      } else {
        // Add a click event listener to the element
        element.addEventListener("click", function () {
          // Get the title from the clicked element
          var titleElement = this.querySelector(".gs-title");
          var title = titleElement.textContent;
          // IMAGE

          const imgElement = this.querySelector("img");
          const src = imgElement.src;

          // URL
          const songURL = this.querySelector(".gs-image");
          const URLsrc = songURL.href;
          console.log(URLsrc); // prints URL

          // MODAL
          var modal = document.getElementById("modal-container");
          var closeButton = document.getElementById("close-modal");
          var pModalTitle = document.getElementById("p-modal-title");
          pModalTitle.innerHTML = title;

          const imgElementUI = document.getElementById("img-modal");
          imgElementUI.src = src;

          const btnModalRedirect =
            document.getElementById("btn-modal-redirect");

          btnModalRedirect.onclick = function () {
            window.open(URLsrc);
            modal.style.display = "none";
          };

          closeButton.onclick = function () {
            modal.style.display = "none";
          };

          // To open the modal, use the following code:
          modal.style.display = "block";
        });
      }
    }

    // ** PAGINATION
    const paginationDiv = document.querySelector(".gsc-cursor-box");
    const prevButton = document.createElement("button");
    prevButton.textContent = "<-PREV";
    prevButton.id = "btn-prev";
    const currentPageNumber = document.createElement("span");
    currentPageNumber.textContent = "1";
    const nextButton = document.createElement("button");
    nextButton.textContent = "NEXT ->";
    nextButton.id = "btn-next";

    paginationDiv.innerHTML = "";

    if (
      paginationDiv.querySelector(
        ".gsc-cursor-page.gsc-cursor-current-page"
      ) === null
    ) {
      paginationDiv.appendChild(nextButton);
    } else {
      paginationDiv.appendChild(prevButton);
      paginationDiv.appendChild(currentPageNumber);
      paginationDiv.appendChild(nextButton);
    }

    prevButton.addEventListener("click", function () {
      // Go to previous page
    });

    nextButton.addEventListener("click", function () {
      // Go to next page
    });
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
