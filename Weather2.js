const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherInfoDiv = document.getElementById('weatherInfo');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('city');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
    }
});

async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeatherData(data);
        } else {
            alert('City not found!');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeatherData(data) {
    const { name, main, weather } = data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];

    weatherInfoDiv.style.display = 'block';
    weatherInfoDiv.innerHTML = `
        <h3>Weather in ${name}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather icon" />
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Description: ${description}</p>
    `;
}
