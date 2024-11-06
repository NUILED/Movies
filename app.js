const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");
let currentPage = 1;
document.addEventListener('DOMContentLoaded', () => {
  // Get the current URL pathname
  const pathname = window.location.pathname;
  
  // Check if the pathname starts with /id/
  if (pathname.startsWith('/')) {
      const urlParams = new URLSearchParams(window.location.search);
      const slug = urlParams.get('id');
      console.log(slug); // Outputs: tt16366836
      // Call your function to fetch data using the id
      fetchMovieDetails(slug);
      // Redirect to the homepage
      // window.location.href = '/';
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
      // Fill the page with movie details
      // const movieTitle = document.querySelector('.movie-title');
      const movieOverview = document.querySelector('.movie-overview');
      console.log(movieOverview.textContent);
      const moviePoster = document.querySelector('.movie-poster');

      // movieTitle.textContent = data.original_title;
      movieOverview.textContent = data.overview;
      moviePoster.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
      moviePoster.alt = data.original_title;
    })
    .catch(error => {
      console.error('Error fetching movie details:', error);
    });
}

// Fetch movie details using the extracted ID
fetchMovieDetails(idParam);

  document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.movie-list-item');
    
    listItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        window.location.reload();
  
        localStorage.setItem('clickedItemIndex', index);
      });
    });
  
    // Check if there's a stored clicked item index
    const clickedItemIndex = localStorage.getItem('clickedItemIndex');
    
    if (clickedItemIndex !== null) {
      fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const list = data.results;
        const featuredMovie = list[clickedItemIndex]; 
    
        const featuredContent = document.querySelector('.featured-content');
        const img = "https://image.tmdb.org/t/p/w500/" + featuredMovie.poster_path;
        const bg = "https://image.tmdb.org/t/p/w1280/" + featuredMovie.backdrop_path;
    
        featuredContent.style.background = `linear-gradient(to bottom, rgba(0,0,0,0), #151515), url('${bg}')`;
    
        const featuredTitle = featuredContent.querySelector('.featured-title');
        featuredTitle.src = img;
        featuredTitle.alt = featuredMovie.original_title;
    
        const featuredDesc = featuredContent.querySelector('.featured-desc');
        featuredDesc.textContent = featuredMovie.overview;
    
        const featuredButton = featuredContent.querySelector('.featured-button');
        featuredButton.textContent = 'WATCH';
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });    
      localStorage.removeItem('clickedItemIndex');
    }
});

function showPopupAfterDelay() {
  setTimeout(function() {
      document.getElementById('popup').style.display = 'block';
      document.getElementById('overlay').style.display = 'block';
  }, 1000); // 10000 milliseconds
}

showPopupAfterDelay();