const moviesRef = firebase.database().ref("Peliculas");
const apikey = "Indicar Token OJO ;)";
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
  return new Promise((resolve, reject) => {
    moviesRef.child(id).once("value", data => {
      console.log("getMovieDetails", data.val())
    });
  });
}

function getMovies() {
  moviesRef.on("value", data => {
    console.log("getMovies", data.val())
  })
}
// TODO: Refactorirzar trabajo conUI directamente

function getMovieData(title) {
  const url = `http://www.omdbapi.com/?t=${title}&apikey=${apikey}`
  return fetch(url).then(resp => resp.json())
}
