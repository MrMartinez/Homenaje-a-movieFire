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
    moviesRef.child(id).once("value", data => {
        console.log("getMovieDetails", data.val());

    });
}
function getMovies() {
    moviesRef.on("value", data => {
        console.log("getMovies", data.val());

    });
}


// moviesRef.update({
//     title: "otro documental",
//     descripcion: "Cambiando un update",
//     viendoCambio: "todo igual agrego viendo cambio"

// });