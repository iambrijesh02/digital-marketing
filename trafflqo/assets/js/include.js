function loadHTML(selector, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.querySelector(selector).innerHTML = data;
    })
    .catch(error => {
      console.error(`Could not load ${url}:`, error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("#site-header", "includes/header.html");
  loadHTML("#site-footer", "includes/footer.html");
  loadHTML("#site-disclaimer", "includes/disclaimer.html");

});
