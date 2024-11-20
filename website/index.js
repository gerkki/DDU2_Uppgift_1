// Recommended: All functions declared here

function lookForCity(targetCityName) {
    for (let city of cities) {
        if (city.name == targetCityName) {
            return city;
        }
    }
    return null;
}

// Recommended: constants with references to existing HTML-elements

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const citiesDiv = document.getElementById("cities");
const tableDiv = document.getElementById("table");

// Recommended: Ask for the city name and then the rest of the code

const targetCityName = prompt("Vilken stad?");

const foundCity = lookForCity(targetCityName);

if (foundCity == null) {
    h2.textContent = `${targetCityName} finns inte i databasen`;
    h3.textContent = "";
    document.title = "Not Found";
} else {
    h2.textContent = `${foundCity.name} (${foundCity.country})`;
    document.title = foundCity.name;
}

for (let city of cities) {
    const cityElement = document.createElement("p");
    cityElement.classList.add("cityBox");

    if (city.name == targetCityName) {
        cityElement.classList.add("target");
    }

    cityElement.textContent = city.name;
    citiesDiv.appendChild(cityElement);
}