const form = document.getElementById("weather-app");
const emptycontainer = document.getElementById("empty-task-list");
const weather = document.getElementById("weather-card");

// variables to store weather data
let temperature = 0;
let humidity = 0;
let condition = "";
let windspeed = 0;

weather.hidden = true;

// Event listener for form submission to fetch weather data and update the UI
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = document.getElementById("input-location").value;
  const unit = document.getElementById("unit").value;

  await getvalue(location);

  convertvalues(unit);

  updateUI();

  emptycontainer.hidden = true;
  weather.hidden = false;
});

// Function to fetch weather data from OpenWeatherMap
async function getvalue(location) {
  try {
    const query = location;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=bb9a8f165f1d7e4e6d936e477d095c2e`;

    const res = await fetch(url);

    const data = await res.json();

    console.log(data);

    temperature = data.main.temp;
    humidity = data.main.humidity;
    condition = data.weather[0].main;
    windspeed = data.wind.speed;
  } catch (error) {
    emptycontainer.hidden = false;
    weather.hidden = true;
    emptycontainer.classList.add("error");
    emptycontainer.querySelector("h2").textContent = "Something Went Wrong";
    emptycontainer.querySelector("p").textContent = error.message;
    throw error;
  }
}

// Function to convert temperature and wind speed values based on selected unit
function convertvalues(unit) {
  if (unit === "metric") {
    temperature = (temperature - 273.15).toFixed(1) + " °C";
  } else if (unit === "imperial") {
    temperature = (((temperature - 273.15) * 9) / 5 + 32).toFixed(1) + " °F";
  }

  windspeed = windspeed + "km/h";
  humidity = humidity + " %";
}

// Function to update the UI with the values
function updateUI() {
  const temperaturecard = document.getElementById("card-temperature-value");
  const humiditycard = document.getElementById("card-humidity-value");
  const conditioncard = document.getElementById("card-condition-value");
  const windspeedcard = document.getElementById("card-windspeed-value");

  temperaturecard.innerText = temperature;
  humiditycard.innerText = humidity;
  conditioncard.innerText = condition;
  windspeedcard.innerText = windspeed;
}
