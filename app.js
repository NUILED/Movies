const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");
let currentPage = 1;
document.addEventListener('DOMContentLoaded', () => {

  const pathname = window.location.pathname;
  
  if (pathname.startsWith('/')) {
      const urlParams = new URLSearchParams(window.location.search);
      const slug = urlParams.get('id');
      fetchMovieDetails(slug);

  }
});
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDJlYjFiODdkMDNjMTcxMzA0ODkyOTA5NzI2ZDQ4ZCIsIm5iZiI6MTczMDg5NTY1OC4wNDM3NjA1LCJzdWIiOiI2MTAxMzIwN2EyMTdjMDAwN2Q2NWMyZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rwGkPKaMr17Y0wNgMqOQiQ9uXgzrLVtDO9NYYsBEqFA'
  }
};

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
});

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

const currentUrl = window.location.href; // url red

const urlParts = currentUrl.split('/');
const idParam = urlParts[urlParts.length - 1]; // Assuming the ID is the last part of the URL

function fetchMovieDetails(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    .then(response => response.json())
    .then(data => {

      // const movieTitle = document.querySelector('.movie-title');
      const movieOverview = document.querySelector('.movie-overview');
      const moviePoster = document.querySelector('.movie-poster');
      
      // movieTitle.textContent = data.original_title;
      movieOverview.textContent = data.overview;
      moviePoster.src = `https://image.tmdb.org/t/p/w92/${data.poster_path}`;
      moviePoster.alt = data.original_title;

    })
    .catch(error => {
      console.error('Error fetching movie details:', error);
    });
}

function showPopupAfterDelay() {
  setTimeout(function() {
      document.getElementById('popup').style.display = 'block';
      document.getElementById('overlay').style.display = 'block';
  }, 10000); // 10000 milliseconds
}
showPopupAfterDelay();