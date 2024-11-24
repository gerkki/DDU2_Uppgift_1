// Recommended: All functions declared here

function createAllCityBoxes() {
    for (let city of cities) {
        const cityElement = document.createElement("p");
        cityElement.textContent = city.name;
        cityElement.classList.add("cityBox");
        citiesDiv.appendChild(cityElement);
    }
}

function lookForCity(targetCityName) {
    for (let city of cities) {
        if (city.name == targetCityName) {
            return city;
        }
    }
    return null;
}

function markCityBox(cityObject, kindOfCity) {
    const cityElements = document.querySelectorAll(".cityBox");
    for (let cityElement of cityElements) {
        if (cityElement.textContent === cityObject.name) {
            cityElement.classList.add(kindOfCity);
        }
    }
}

// Recommended: constants with references to existing HTML-elements

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const citiesDiv = document.getElementById("cities");
const tableDiv = document.getElementById("table");

// Recommended: Ask for the city name and then the rest of the code

const allCities = createAllCityBoxes();

// const completeTable = Här ska funktionen för tabellen anropas!

const targetCityName = prompt("Vilken stad?");

const foundCity = lookForCity(targetCityName);

if (foundCity == null) {
    h2.textContent = `${targetCityName} finns inte i databasen`;
    h3.textContent = "";
    document.title = "Not Found";
}

if (foundCity !== null) {
    h2.textContent = `${foundCity.name} (${foundCity.country})`;
    document.title = foundCity.name;
    markCityBox(foundCity, "target");
    h3.textContent = `Av städerna i databasen ligger x närmast och y längst bort`;
}


