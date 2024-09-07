const cityInput = document.getElementById("city-input");
const enterBtn = document.getElementById("enter-btn");
const weatherCityForm = document.getElementById("weather-city-form");
const API_KEY = "23c5ed2ad62bd6686b523648cd3b6700";

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
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};



const displayWeatherData = data => {
    const { weather, main: mainWeather, sys, name } = data;
    const { main, description, icon } = weather;
    const { temp, feels_like, temp_min, temp_max, humidity } = mainWeather;
}

