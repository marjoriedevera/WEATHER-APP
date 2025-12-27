# Weather App (OpenWeatherMap API)
# Overview

This is a simple Weather App that allows users to check the weather of any city in the world using the OpenWeatherMap API. The app shows current weather, a 24-hour hourly forecast, and a 5-day forecast. It also includes day/night themes, a temperature color scale, and a dark/light mode toggle.

# Features

- Search weather by city name

- Display current temperature, humidity, weather description, and icon

- Hourly forecast (next 24 hours)

- 5-day forecast (daily at 12:00 PM)

- Temperature color scale: cold → blue, mild → green, hot → red

- Day/night background

- Dark/Light mode toggle

- Responsive design for desktop and mobile

# Technologies Used

- HTML – Structure of the web page

- CSS – Styling, day/night theme, dark/light mode

- JavaScript – Fetching API data, updating content dynamically

- OpenWeatherMap API – Weather data

# Setup & Usage

1. Replace the apiKey in script.js with your OpenWeatherMap API key:

const apiKey = "YOUR_API_KEY_HERE";


2. Open index.html in a web browser.

3. Enter a city name and click Search to view current weather, hourly forecast, and 5-day forecast.

4. Click the Dark/Light Mode button to switch themes.

# How It Works

- The app uses OpenWeatherMap API endpoints to get weather data:

    - Current weather: /data/2.5/weather

    - 5-day forecast: /data/2.5/forecast

- JavaScript updates the page with the temperature, humidity, description, and icons.

- The app also colors the temperature text based on the temperature range and changes the background for day/night.
