const cityInput = document.getElementById("city-input");
const enterBtn = document.getElementById("enter-btn");
const weatherCityForm = document.getElementById("weather-city-form");
const API_KEY = "23c5ed2ad62bd6686b523648cd3b6700";
const weatherDataContainer = document.querySelector(".weather-data-container");

weatherCityForm.addEventListener("submit", e => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
        alert("Invalid input.");
        return;
    }

    fetchData();
});



const fetchData = async () => {
    const city = cityInput.value.trim();
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
        const data = await res.json();

        if (data.cod != 404) {
            displayWeatherData(data);
        } else {
            weatherDataContainer.innerHTML = `Location not found`;
            throw new Error("Invalid input.");
        }
    } catch (err) {
        console.log(err);
        weatherDataContainer.innerHTML = `Location not found`;
    }
};



const displayWeatherData = data => {
    const { weather, main: mainWeather, sys, name } = data;
    const [{ main, description, icon }] = weather;
    const { temp, feels_like, temp_min, temp_max, humidity } = mainWeather;
    const { country } = sys;

    weatherDataContainer.style.opacity = "1"

    weatherDataContainer.innerHTML = `
        <h2 class="city-name">${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Icon of ${description}" class="weather-icon" />
        <h3 class="main-weather">${main}</h3>
        <p class="temperature">Temp: ${(temp - 273.15).toFixed(2)}°C</p>
        <p>Min: ${(temp_min - 273.15).toFixed(2)}°C</p>
        <p>Max: ${(temp_max - 273.15).toFixed(2)}°C</p>
        <p>Feels like: ${(feels_like - 273.15).toFixed(2)}°C</p>

    `

    cityInput.value = '';
}

