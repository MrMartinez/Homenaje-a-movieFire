const moviesRef = firebase.database().ref("Peliculas");
const apikey = "<--En produccion-->";
// const apikey = "PlzBanMe";

function addMovie(data) {
  return moviesRef.push(data);
}
function deleteMovie(id) {
  return moviesRef.child(id).remove();
}

function updateMovie(id, data) {
  return moviesRef.child(id).set(data);
}

function getMovieDetails(id) {
  //TODO: refactor por la comunidad usando Arrays
  return new Promise((resolve, reject) => {
    moviesRef.child(id).once("value", data => {
      console.log("getMovieDetails", data.val());
    });
  });
}

function getMovieData(title) {
  const url = `http://www.omdbapi.com/?t=${title}&apikey=${apikey}`;
  return fetch(url).then(resp => resp.json());
}

const filsSlctr = document.getElementById("listPeliculas");
const titleSlctr = document.getElementById("title");
//Eventos
moviesRef.on("value", data => {
  const peliculaData = data.val();
  console.log("getMovies: ", peliculaData);

  let cuerpoLista = "";
  //TODO: refactor por la comunidad usando Arrays

  for (const key in peliculaData) {
    if (peliculaData.hasOwnProperty(key)) {
      const element = peliculaData[key];
      cuerpoLista += `<li>${element.Title}</li>`;
    }
  }
  filsSlctr.innerHTML = cuerpoLista;
});

titleSlctr.addEventListener("keyup", event =>{
    const titleContent = titleSlctr.value.trim();
    if (event.keyCode === 13 && titleContent) {
        // console.log("wepa", titleContent);
        getMovieData(titleContent)
        .then(movieData => {
           addMovie(movieData);
        });
    }
});
