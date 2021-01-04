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

//UPDATE LOCATION WITH CURRENT

function getWeather(event) {
  event.preventDefault();
  let currentLocation = document.querySelector(".location");
  let inputCity = document.querySelector(".search-city");

  currentLocation.innerHTML = inputCity.value;
}
let city = document.querySelector("form");
city.addEventListener("submit", getWeather);

// CHANGE UNITS FROM CELSIUS TO FARENHEIT

function convertCelsius(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("div.degrees");
  tempCelsius.innerHTML = "12°C";
}

let celsiusUnits = document.querySelector("#celsius");
celsiusUnits.addEventListener("click", convertCelsius);

function convertFarenheit(event) {
  event.preventDefault();
  let tempFarenheit = document.querySelector("div.degrees");
  tempFarenheit.innerHTML = "53.6°F";
}

let farenheitUnits = document.querySelector("#farenheit");
farenheitUnits.addEventListener("click", convertFarenheit);
