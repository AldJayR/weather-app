const cityInput = document.getElementById("city-input");
const enterBtn = document.getElementById("enter-btn");
const weatherCityForm = document.getElementById("weather-city-form");
const API_KEY = "23c5ed2ad62bd6686b523648cd3b6700";

const fetchData = async () => {
    const city = cityInput.value;
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
        const data = await res.json();
    } catch (err) {
        console.log(err);
    }
}

enterBtn.onclick = () => console.log(cityInput.value);