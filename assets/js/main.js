const pokemonList = document.querySelector("#pokemon-container");
const buttonsHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
// funtion pour parcourir et avoir les 6 premiers pokemons
for (let i = 1; i <= 6; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => ShowPokemon(data));
}
// funtion pour montrer les pokemon sur la page
function ShowPokemon(poke) {
  let genres = poke.types.map( // pour ajouter le types de pokemon sur la page
    (type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`
  );
  genres = genres.join("");

  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
        <p class="poke-id-arriere">#${pokeId}</p>
        <div class="poke-img">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="poke-info">
            <div class="nom-container">
                <p class="poke-id">#${pokeId}</p>
                <h2 class="poke-nom">${poke.name}</h2>
            </div>
            <div class="poke-type">

                ${genres}
            </div>
            <div class="poke-stats">
                <p class="stats">${poke.height}m</p>
                <p class="stats">${poke.weight}kg</p>
            </div>
        </div>
    `;
  pokemonList.append(div);
}

buttonsHeader.forEach((button) =>
  button.addEventListener("click", (event) => {
    const buttonId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (buttonId === "voir-tous") {
            ShowPokemon(data);
          } else {
            const genres = data.types.map((type) => type.type.name);
            if (genres.some((genre) => genre.includes(buttonId))) {
              ShowPokemon(data);
            }
          }
        });
    }
  })
);

 // Pour avoir le scroll vers l'haute
 const btnScrollUp = document.getElementById('up');

 // Montrer ou cache le scroll 
 window.onscroll = function() {scrollFunction()};

 function scrollFunction() {
     // le button va a se montrer si le scroll se deplace 20px de sa position intial
     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnScrollUp.style.display = 'flex';
     } else {
        btnScrollUp.style.display = 'none';
     }
 }

 // funtion pour deplacer la page ver l'haut
 function scrollToTop() {
     window.scrollTo({
         top: 0,
         behavior: 'smooth' // deplacement fluide
     });
 }

 // ajouter un event listener sur le button
 btnScrollUp.addEventListener('click', scrollToTop);

