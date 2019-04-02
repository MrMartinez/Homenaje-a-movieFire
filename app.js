const moviesRef = firebase.database().ref("Peliculas");
// const apikey = "<--En produccion-->";
const apikey = "PlzBanMe";

function addMovie(data) {
  return moviesRef.push(data);
}
function deleteMovie(id) {
  return moviesRef.child(id).remove();
}

function updateMovie(id, data) {
  return moviesRef.child(id).set(data);
}

function getMovieDetails (id) {
    //@TODO: Refactor por la comunidad
    return new Promise ((resolve, reject) => {
        moviesRef.child(id).once("value", data => {
            resolve(data.val())
        })
    })
}


function getMovieData(title) {
  const url = `http://www.omdbapi.com/?t=${title}&apikey=${apikey}`;
  return fetch(url).then(resp => resp.json());
}
function showDetails (data){
    detailsSlctr.style.display = "block";
    detailsSlctr.innerHTML = `<pre><code>${JSON.stringify(data, null, 4)}</code></pre>`;

}


const filsSlctr = document.getElementById("listPeliculas");
const titleSlctr = document.getElementById("title");
const detailsSlctr = document.getElementById("details");

//Eventos
moviesRef.on("value", data => {
  const peliculaData = data.val();
  console.log("getMovies: ", peliculaData);

  let cuerpoLista = "";
  //TODO: refactor por la comunidad usando Arrays

  for (const key in peliculaData) {
    if (peliculaData.hasOwnProperty(key)) {
      const element = peliculaData[key];
      cuerpoLista += `<li data-id="${key}">${element.Title}
      <button data-action="details">Detalles</button>
      <button data-action="edit">Editar</button>
      <button data-action="delete">Eliminar</button>
      </li>`;
    }
  }
  filsSlctr.innerHTML = cuerpoLista;
});

filsSlctr.addEventListener("click", event => {
  const target = event.target;
  if (target.nodeName === "BUTTON") {
    const id = target.parentNode.dataset.id;
    const action = target.dataset.action;
    if(action === "details") {
        getMovieDetails(id)
            .then(showDetails);
    } else if (action === "edit") {
      const newTitle = prompt("Nuevo Titulo: ").trim();
      if (newTitle) {
        getMovieData(newTitle).then(newDetails => updateMovie(id, newDetails));
      }
    } else if (action === "delete") {
      if (confirm("Seguro desea borrar?")) {
        deleteMovie(id);
      }
    }
  }
  //Viendo las propiedades de ese evento hay una llamada nodeName
});
titleSlctr.addEventListener("keyup", event => {
  const titleContent = titleSlctr.value.trim();
  if (event.keyCode === 13 && titleContent) {
    // console.log("wepa", titleContent);
    getMovieData(titleContent).then(movieData => {
      addMovie(movieData);
    });
  }
});
