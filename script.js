const cityInput = document.getElementById("city-input");
const enterBtn = document.getElementById("enter-btn");
const weatherCityForm = document.getElementById("weather-city-form");
const API_KEY = "23c5ed2ad62bd6686b523648cd3b6700";
const weatherDataContainer = document.querySelector(".weather-data-container");

weatherCityForm.addEventListener("submit", e => {
    e.preventDefault();
    const city = cityInput.value;
    if (!city) {
        alert("Invalid input.");
        return false;
    }

    fetchData();
});


const fetchData = async () => {
    const city = cityInput.value;
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
        const data = await res.json();
        displayWeatherData(data);
    } catch (err) {
        console.log(err);
        weatherDataContainer.innerHTML = `City not found`;
    }
};



const displayWeatherData = data => {
    const { weather, main: mainWeather, sys, name } = data;
    const [{ main, description, icon }] = weather;
    const { temp, feels_like, temp_min, temp_max, humidity } = mainWeather;
    const { country } = sys;

    weatherDataContainer.innerHTML = `
        <h2 class="city-name">${name}</h2>
        <small>${country}</small>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Icon of ${description}" class="weather-icon" />
        <h5 class="main-weather">${main}</h5>
        <p class="temperature">${(temp - 273.15).toFixed(2)}°C</p>
        <p>Min: ${(temp_min - 273.15).toFixed(2)}°C</p>
        <p>Max: ${(temp_max - 273.15).toFixed(2)}°C</p>
        <p>Feels like: ${(feels_like - 273.15).toFixed(2)}°C</p>

    `
}

