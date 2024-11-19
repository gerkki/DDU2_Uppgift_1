// Recommended: All functions declared here



// Recommended: constants with references to existing HTML-elements

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const citiesDiv = document.getElementById("cities");

// Recommended: Ask for the city name and then the rest of the code

const targetCityName = prompt("Vilken stad?");

for (let city of cities) {
    citiesDiv.innerHTML += `<p class="cityBox">${city.name}</p>`;
}