// GET CURRENT DATE

function formatDate(timestamp) {
  let now = new Date(timestamp);
  
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  
  let day = days[now.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}


// GET FORECAST DATA - TIME, ICON AND TEMPERATURES

function formatHours(timestamp){
  let now = new Date(timestamp);
  let hours = now.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }

  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  
  return `${hours}:${minutes}`;
}

function showForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-">
            <h3>
              ${formatHours(forecast.dt *1000)}
            </h3>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}">
            <div class="forecast-temperature">
              <strong>
              ${Math.round(forecast.main.temp_max)}°
              </strong> 
              ${Math.round(forecast.main.temp_min)}°
            </div>
          </div>
    `;
  }
  


}

// SEARCH CITY INPUT BY USER


function search(city){
  let apiKey = "41398c377c1e7843b58672992d67d0cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showTemperature);


  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}



function getWeather(event) {
  let city = document.querySelector(".search-city").value;
  search(city);
  event.preventDefault();
}

// SHOW TEMPERATURE BASED ON INPUT BY USER

function showTemperature(response){
      document.querySelector("h1").innerHTML = response.data.name;
      let temperature = document.querySelector("div.degrees");
      let tempCurrent = Math.round(response.data.main.temp);
      temperature.innerHTML = `${tempCurrent}°C`;
      let iconElement = document.querySelector("#icon");
      let updateElement = document.querySelector(".last-update"); 
      

      document.querySelector("#humidity").innerHTML = response.data.main.humidity;
      document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
      document.querySelector("#weather-desc").innerHTML = response.data.weather[0].description;
      document.querySelector("#low-temp").innerHTML = Math.round(response.data.main.temp_min);
      document.querySelector("#high-temp").innerHTML = Math.round(response.data.main.temp_max);
      updateElement.innerHTML = formatDate(response.data.dt * 1000);
      iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      iconElement.setAttribute("alt", response.data.weather[0].description);


// CONVERT CURRENT TEMPERATURE TO CELSIUS/FARANHEIT

function convertCelsius(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("div.degrees");
  tempCelsius.innerHTML = `${tempCurrent}°C`;
}
let celsiusUnits = document.querySelector("#celsius");
celsiusUnits.addEventListener("click", convertCelsius);

function convertFarenheit(event) {
  event.preventDefault();
  let tempFarenheit = document.querySelector("div.degrees");
  let farenheitTemp = `${tempCurrent}` * 9/5 + 32;
  tempFarenheit.innerHTML = `${Math.round(farenheitTemp)}°F`;
}

let farenheitUnits = document.querySelector("#farenheit");
farenheitUnits.addEventListener("click", convertFarenheit);

}

// SET TEMPERATURE TO USER'S CURRENT LOCATION 

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "41398c377c1e7843b58672992d67d0cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let city = document.querySelector("form");
city.addEventListener("submit", getWeather);
let currentLocation = document.querySelector(".btn-current");
currentLocation.addEventListener("click", getPosition);

search("Madrid");







