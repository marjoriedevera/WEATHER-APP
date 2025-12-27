const apiKey = "fe15cf5656d7fd2b2df6e6f5d1f66860"; // Replace with your OpenWeatherMap API key
let darkMode = false;

async function getWeather() {
    const city = document.getElementById("city").value;
    const errorBox = document.getElementById("errorBox");
    errorBox.innerText = "";

    if (!city) {
        errorBox.innerText = "Please enter a city name.";
        return;
    }

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const weatherRes = await fetch(weatherURL);
        const weatherData = await weatherRes.json();

        if (weatherData.cod !== 200) {
            errorBox.innerText = "City not found.";
            return;
        }

        const forecastRes = await fetch(forecastURL);
        const forecastData = await forecastRes.json();

        // Current Weather
        document.getElementById("cityName").innerText = weatherData.name;
        const tempEl = document.getElementById("temp");
        const temp = weatherData.main.temp;
        tempEl.innerText = `Temperature: ${temp} °C`;
        // Temperature color scale
        tempEl.style.color = temp < 10 ? "blue" : temp <= 25 ? "green" : "red";

        document.getElementById("humidity").innerText = `Humidity: ${weatherData.main.humidity}%`;
        document.getElementById("desc").innerText = weatherData.weather[0].description;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

        // Weather background animation
        document.body.className = ""; // reset classes
        const mainWeather = weatherData.weather[0].main.toLowerCase();
        if(mainWeather.includes("cloud")) document.body.classList.add("cloudy");
        else if(mainWeather.includes("rain") || mainWeather.includes("drizzle")) document.body.classList.add("rainy");
        else if(mainWeather.includes("snow")) document.body.classList.add("snow");
        else document.body.classList.add("sunny");

        // Hourly Forecast (next 24 hours)
        const hourlyDiv = document.getElementById("hourly");
        hourlyDiv.innerHTML = "";
        const hourlyForecast = forecastData.list.slice(0,8); // 8 entries = 24h
        hourlyForecast.forEach(hour => {
            const time = new Date(hour.dt_txt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
            const hourEl = document.createElement("div");
            hourEl.className = "hour";
            hourEl.innerHTML = `
                <p>${time}</p>
                <img src="https://openweathermap.org/img/wn/${hour.weather[0].icon}.png">
                <p>${hour.main.temp} °C</p>
            `;
            hourlyDiv.appendChild(hourEl);
        });

        // 5-Day Forecast
        const forecastDiv = document.getElementById("forecast");
        forecastDiv.innerHTML = "";
        const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));
        dailyForecasts.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
            const div = document.createElement("div");
            div.className = "day";
            div.innerHTML = `
                <p>${date}</p>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
                <p>${day.main.temp} °C</p>
            `;
            forecastDiv.appendChild(div);
        });

    } catch (error) {
        errorBox.innerText = "Error fetching weather data.";
        console.error(error);
    }
}

// Dark / Light Mode toggle
function toggleTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
}
