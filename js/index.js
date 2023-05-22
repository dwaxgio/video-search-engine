var searchEngineId = "c181a49ecc3cc4afa";

function search() {
  var searchTerm = document.getElementById("search").value;
  var cse = new google.search.cse.element(searchEngineId, {
    h1: "en",
    q: searchTerm,
    num: 10,
    siteSearch: "youtube.com",
  });

  cse.execute(function (result) {
    var resultList = document.getElementById("results");
    resultList.style.display = "block";

    for (var i = 0; i < resultList.lenght; i++) {
      var result = results[i];
      var resultDiv = document.createElement("div");
      resultDiv.className = "result";

      var img = document.createElement("img");
      img.src = result.image;

      var h4 = document.createElement("h4");
      h4.textContent = result.title;

      var p = document.createElement("p");
      p.textContent = result.snippet;

      resultDiv.appendChild(img);
      resultDiv.appendChild(h4);
      resultDiv.appendChild(p);

      resultList.appendChild(resultDiv);
    }
  });
}

document.getElementById("search-button").addEventListener("click", search);
