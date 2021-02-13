// UPDATE WITH CURRENT DATE
let now = new Date();

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
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector(".last-update");
currentDate.innerHTML = `${day} ${hour}:${minutes}`;

//UPDATE LOCATION WITH INPUT

function search(city){
  let apiKey = "41398c377c1e7843b58672992d67d0cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showTemperature);
}



function getWeather(event) {
  let city = document.querySelector(".search-city").value;
  search(city);
  event.preventDefault();
}


function showTemperature(response){
      document.querySelector("h1").innerHTML = response.data.name;
      let temperature = document.querySelector("div.degrees");
      let tempCurrent = Math.round(response.data.main.temp);
      temperature.innerHTML = `${tempCurrent}°C`;
      let iconElement = document.querySelector("#icon");
      

      document.querySelector("#humidity").innerHTML = response.data.main.humidity;
      document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
      document.querySelector("#weather-desc").innerHTML = response.data.weather[0].description;
      document.querySelector("#low-temp").innerHTML = Math.round(response.data.main.temp_min);
      document.querySelector("#high-temp").innerHTML = Math.round(response.data.main.temp_max);
      iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      iconElement.setAttribute("alt", response.data.weather[0].description);



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
  tempFarenheit.innerHTML = `${farenheitTemp}°F`;
}

let farenheitUnits = document.querySelector("#farenheit");
farenheitUnits.addEventListener("click", convertFarenheit);

}


function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "41398c377c1e7843b58672992d67d0cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
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

// FORECAST






