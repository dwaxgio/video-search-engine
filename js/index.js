var cse;

function initialize() {
  google.search.cse.element.getElement("search").execute("");
}

function onSearchComplete() {
  var searchTerm = document.getElementById("search").value;
  var results = cse.search(searchTerm, {
    safe: "active",
    filter: "1",
    num: 10,
    sort: "viewcount",
  });

  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    var videoResult = document.createElement("div");
    videoResult.className = "video-result";

    var img = document.createElement("img");
    img.src = result.image.src;
    videoResult.appendChild(img);

    var info = document.createElement("div");
    info.className = "info";

    var title = document.createElement("h4");
    title.textContent = result.title;
    info.appendChild(title);

    var views = document.createElement("p");
    views.textContent = "Views: " + result.viewCount;
    info.appendChild(views);

    videoResult.appendChild(info);

    resultsDiv.appendChild(videoResult);

    videoResult.onclick = (function (result) {
      return function () {
        openPreview(result.link);
      };
    })(result);
  }

//   cse.setSiteRestriction("www.youtube.com");
}

function openPreview(link) {
  var previewOverlay = document.getElementById("preview-overlay");
  var visitButton = document.getElementById("visit-button");
  var closeButton = document.getElementById("close-button");

  visitButton.onclick = function () {
    window.open(link, "_blank");
    closePreview();
  };

  closeButton.onclick = function () {
    closePreview();
  };

  previewOverlay.style.display = "block";
}

function closePreview() {
  var previewOverlay = document.getElementById("preview-overlay");
  previewOverlay.style.display = "none";
}

window.onload = function () {
  cse = new google.search.CustomSearchControl("c181a49ecc3cc4afa");
  cse.setResultSetSize(10);
  cse.setSearchCompleteCallback(this, onSearchComplete);
  cse.setSiteRestriction("www.youtube.com");
  cse.draw("results");

  var searchButton = document.getElementById("search-button");
  searchButton.onclick = function () {
    initialize();
  };
};
