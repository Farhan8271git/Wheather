
const apiKey = "cd1b7fdd98bf5c211071b8d5a4a0d577";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherResult = document.getElementById("weatherResult");
  const forecastDiv = document.getElementById("forecast");

  if (city === "") {
    weatherResult.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  // Current Weather API
  const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // Forecast API (5 days, 3-hour intervals)
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // Fetch current weather
    const responseCurrent = await fetch(urlCurrent);
    const dataCurrent = await responseCurrent.json();

    if (dataCurrent.cod === "404") {
      weatherResult.innerHTML = "<p>❌ City not found!</p>";
      forecastDiv.innerHTML = "";
      return;
    }

    // Show current weather
    const iconCurrent = `https://openweathermap.org/img/wn/${dataCurrent.weather[0].icon}@2x.png`;

    weatherResult.innerHTML = `
      <h2>${dataCurrent.name}, ${dataCurrent.sys.country}</h2>
      <img src="${iconCurrent}" alt="Weather icon">
      <p>🌡️ Temp: ${dataCurrent.main.temp} °C</p>
      <p>☁️ Weather: ${dataCurrent.weather[0].description}</p>
      <p>💧 Humidity: ${dataCurrent.main.humidity}%</p>
      <p>🌬️ Wind: ${dataCurrent.wind.speed} m/s</p>
    `;

    // Fetch forecast data
    const responseForecast = await fetch(urlForecast);
    const dataForecast = await responseForecast.json();

    // Process forecast → 1 forecast per day (12:00)
    const dailyForecast = {};
    dataForecast.list.forEach(item => {
      if (item.dt_txt.includes("12:00:00")) {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString("en-US", { weekday: "long" });
        dailyForecast[day] = item;
      }
    });

    // Show forecast
    forecastDiv.innerHTML = "";
    Object.keys(dailyForecast).forEach((day, index) => {
      const item = dailyForecast[day];
      const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

      const dayCard = document.createElement("div");
      dayCard.className = "forecast-day";
      if (index === 0) dayCard.classList.add("active"); // first one active by default

      dayCard.innerHTML = `
        <h4>${day}</h4>
        <img src="${icon}" alt="icon">
        <p>${item.main.temp.toFixed(1)} °C</p>
        <p>${item.weather[0].description}</p>
      `;

      // Click event  highlight
      dayCard.addEventListener("click", () => {
        document.querySelectorAll(".forecast-day").forEach(el => el.classList.remove("active"));
        dayCard.classList.add("active");
      });

      forecastDiv.appendChild(dayCard);
    });

  } catch (error) {
    weatherResult.innerHTML = "<p>⚠️ Error fetching data.</p>";
    forecastDiv.innerHTML = "";
  }
}


// ====== EVENTS ======
searchBtn.addEventListener("click", searchWeather);
cityInput.addEventListener("keydown", (e) => { if (e.key === "Enter") searchWeather(); });