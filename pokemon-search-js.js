const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const sprite = document.getElementById('sprite');

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

searchButton.addEventListener('click', searchPokemon);

function searchPokemon() {
    const searchTerm = searchInput.value.toLowerCase();

    fetch(apiUrl + searchTerm)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            updatePokemonInfo(data);
        })
        .catch(error => {
            alert(error.message);
            clearPokemonInfo();
        });
}

function updatePokemonInfo(data) {
    pokemonName.textContent = data.name.toUpperCase();
    pokemonId.textContent = `#${data.id}`;
    weight.textContent = data.weight;
    height.textContent = data.height;
    
    types.innerHTML = '';
    data.types.forEach(type => {
        const typeElement = document.createElement('span');
        typeElement.textContent = type.type.name.toUpperCase();
        types.appendChild(typeElement);
    });
    
    hp.textContent = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
    attack.textContent = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
    defense.textContent = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
    specialAttack.textContent = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    specialDefense.textContent = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    speed.textContent = data.stats.find(stat => stat.stat.name === 'speed').base_stat;
    
    sprite.src = data.sprites.front_default;
    sprite.alt = data.name;
}

function clearPokemonInfo() {
    pokemonName.textContent = '';
    pokemonId.textContent = '';
    weight.textContent = '';
    height.textContent = '';
    types.innerHTML = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
    sprite.src = '';
    sprite.alt = '';
}
