// Recommended: All functions declared here

function createAllCityBoxes() {
    for (let city of cities) {
        const cityElement = document.createElement("p");
        cityElement.textContent = city.name;
        cityElement.classList.add("cityBox");
        citiesDiv.appendChild(cityElement);
    }
}

function createDistanceTable() {
    const emptyColumn = document.createElement("p");
    emptyColumn.classList.add("cell");
    tableDiv.appendChild(emptyColumn);

    for (let cityColumnHead of cities) {
        const columnHead = document.createElement("p");
        columnHead.textContent = cityColumnHead.id;
        columnHead.classList.add("cell", "head_column");
        tableDiv.appendChild(columnHead);
    }

    for (let cityRowHead of cities) {
        const rowHead = document.createElement("p");
        rowHead.textContent = `${cityRowHead.id}-${cityRowHead.name}`;
        rowHead.classList.add("cell", "head_row");
        if (cityRowHead.id % 2 == 0) {
            rowHead.classList.add("even_row");
        }
        tableDiv.appendChild(rowHead);

        for (let cityColumns of cities) {
            const columnsTable = document.createElement("p");
            columnsTable.textContent = cityColumns.id;
            if (cityColumns.id % 2 == 0) {
                columnsTable.classList.add("even_col");
            }
            if (cityColumns.id == cityRowHead.id) {
                columnsTable.textContent = "";
            }
            if (cityRowHead.id % 2 == 0) {
                columnsTable.classList.add("even_row");
            }
            columnsTable.classList.add("cell");
            tableDiv.appendChild(columnsTable);
        }
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

function findClosestCity(targetCity) {
    let closestCityDistance = Infinity;
    let closestCity = null;

    for (let d of distances) {
        // Kontrollera om avståndet gäller targetCity
        if (d.city1 === targetCity.id || d.city2 === targetCity.id) {
            // Hitta andra stadens ID
            const otherCityId = d.city1 === targetCity.id ? d.city2 : d.city1;

            // Leta upp staden med loop
            let otherCity = null;
            for (let city of cities) {
                if (city.id === otherCityId) {
                    otherCity = city;
                    break; // Avsluta loopen när vi hittar staden
                }
            }

            // Uppdatera närmaste stad om detta avstånd är kortare
            if (d.distance < closestCityDistance) {
                closestCityDistance = d.distance;
                closestCity = otherCity;
            }
        }
    }
    return { city: closestCity, distance: closestCityDistance };
}

function findFurthestCity(targetCity) {
    let furthestCityDistance = 0;
    let furthestCity = null;

    for (let d of distances) {
        // Kontrollera om avståndet gäller targetCity
        if (d.city1 === targetCity.id || d.city2 === targetCity.id) {
            // Hitta andra stadens ID
            const otherCityId = d.city1 === targetCity.id ? d.city2 : d.city1;

            // Leta upp staden med loop
            let otherCity = null;
            for (let city of cities) {
                if (city.id === otherCityId) {
                    otherCity = city;
                    break; // Avsluta loopen när vi hittar staden
                }
            }

            // Uppdatera staden längst bort om detta avstånd är längre
            if (d.distance > furthestCityDistance) {
                furthestCityDistance = d.distance;
                furthestCity = otherCity;
            }
        }
    }
    return { city: furthestCity, distance: furthestCityDistance };
}

function markCityBox(cityObject, cityClass, distance = null) {
    const cityElements = document.querySelectorAll(".cityBox");
    for (let cityElement of cityElements) {
        if (cityElement.textContent === cityObject.name) {
            cityElement.classList.add(cityClass);
            if (cityClass == "closest" && distance !== null) {
                cityElement.innerHTML += ` ligger ${distance} mil bort `;
            }
            if (cityClass == "furthest" && distance !== null) {
                cityElement.innerHTML += ` ligger ${distance} mil bort `;
            }
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

const completeTable = createDistanceTable();

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
    const { city: closestCity, distance: closestCityDistance } = findClosestCity(foundCity);
    markCityBox(closestCity, "closest", closestCityDistance / 10);
    const { city: furthestCity, distance: furthestCityDistance } = findFurthestCity(foundCity);
    markCityBox(furthestCity, "furthest", furthestCityDistance / 10);
    h3.textContent = `Av städerna i databasen ligger ${closestCity.name} närmast och ${furthestCity.name} längst bort`;
}
