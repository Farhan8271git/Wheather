#  Weather App

A simple and stylish weather application built using HTML, CSS, and JavaScript.
It fetches real-time weather data and a 5-day forecast from the OpenWeatherMap API.

# FEATURES

 Search weather by city name
 Shows current temperature, weather, humidity, and wind speed
 Displays a 5-day forecast (one update per day at 12:00 PM)
 Beautiful and responsive UI with hover effects
 Highlight the selected forecast day with animation

# Tech Stack
Frontend: HTML, CSS, JavaScript,API

📂 Project Structure
weather-app/

│── index.html       
│── style.css        
│── script.js  

# API Key
This project uses OpenWeatherMap API.
API key is already included in script.js:
const apiKey = "cd1b7fdd98bf5c211071b8d5a4a0d577";

If this API doesn't work go to this website https://home.openweathermap.org
and change the API key in script.js file with new one 


# How It Works

1. User enters a city name
2. App fetches data from OpenWeatherMap’s Current Weather and Forecast APIs

3. Displays:-

    Current weather details
   
    Forecast cards for the next 5 days
   
4.  User can click forecast cards to highlight them

# Contributing

Contributions, issues, and feature requests are welcome!

Feel free to fork this repo and submit a Pull Request.

# License

This project is free to use and distributed under the MIT License.
