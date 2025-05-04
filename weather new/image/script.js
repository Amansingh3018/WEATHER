// OpenWeatherMap API configuration
const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityButtons = document.querySelectorAll('.city-btn');
const cityName = document.getElementById('city-name');
const date = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');

// Update date
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    date.textContent = now.toLocaleDateString('en-US', options);
}

// Fetch weather data
async function getWeatherData(city) {
    try {
        const response = await fetch(`${BASE_URL}?q=${city},IN&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found. Please try again.');
            return;
        }

        updateWeatherUI(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Update UI with weather data
function updateWeatherUI(data) {
    cityName.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    wind.textContent = `Wind: ${data.wind.speed} km/h`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
    
    // Update weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

cityButtons.forEach(button => {
    button.addEventListener('click', () => {
        const city = button.dataset.city;
        cityInput.value = city;
        getWeatherData(city);
    });
});

// Initialize
updateDate();
getWeatherData('Mumbai'); // Default city 