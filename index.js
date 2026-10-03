// =========== WEATHER PROGRAM ========== //
const form = document.querySelector("form");

const apiKey = "dfc92b069ec7442ad3f227aea7aa0d8d";

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const city_name = city.toUpperCase();

    const eyebrown = document.getElementById("eyebrown");
    const mainCity = document.getElementById("cityName");
    const weather = document.getElementById("weather");
    const emoji = document.getElementById("emoji");
    const temperature = document.getElementById("temp");


    try {
        let response = await fetch(url);

        if (!response.ok) {
            console.log(`HTTP ERROR: ${response.status}`);
            return;
        }

        let data = await response.json();
        let weather_report = data.weather[0];
        let weather_status = weather_report.main;
        let weather_emoji;

        switch (weather_status) {
            case "Thunderstorm":
                weather_emoji = "⛈️";
                break;
            case "Drizzle":
            case "Rain":
                weather_emoji = "🌧️";
                break;
            case "Snow":
                weather_emoji = "❄️";
                break;
            case "Clear":
                weather_emoji = "☀️";
                break;
            case "Clouds":
                weather_emoji = "☁️";
                break;
            case "Mist":
            case "Smoke":
            case "Haze":
            case "Dust":
            case "Fog":
            case "Sand":
            case "Ash":
            case "Squall":
            case "Tornado":
                weather_emoji = "🌫️";
                break;
            default:
                weather_emoji = "🌡️";
        }

        let temp = data.main.temp;
        let KelvintoCelsius = temp - 273.15;
        KelvintoCelsius = KelvintoCelsius.toFixed(2);

        // output of weather data
        eyebrown.textContent = city_name;
        mainCity.textContent = `City: ${city_name}`;
        weather.textContent = `Weather: ${weather_status}`;
        emoji.textContent = weather_emoji;
        temperature.textContent = `Temperature: ${KelvintoCelsius}℃`;

    } catch (e) {
        console.error(`Error: ${e.name}`);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const getCity = document.getElementById("city").value.trim().toLowerCase();
    getWeatherData(getCity);
});