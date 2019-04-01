console.log('Wepa!'); 


const moviesRef = firebase.database().ref('Peliculas');

function addMovie(data) {
  return moviesRef.push(data)
}
function deleteMovie(id) {
   return moviesRef.child(id).remove()
}

function updateMovie(id,data) {
   return moviesRef.child(id).set(data);
}

function getMovieDetails(id) {
    
}
function getMovies() {
    
}
// moviesRef.update({
//     title: "otro documental",
//     descripcion: "Cambiando un update",
//     viendoCambio: "todo igual agrego viendo cambio"

// });