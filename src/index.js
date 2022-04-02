let currentDate = document.querySelector("#actual-time");
console.log(currentDate);
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

currentDate.innerHTML = `${day}, ${hours}:${minutes}`;


function getCurrentWeather(response) {

  document.querySelector("h1").innerHTML = response.data.name;
  
  document.querySelector("#country").innerHTML = response.data.sys.country;
  
  document.querySelector("#local-temp").innerHTML = `${Math.round(response.data.main.temp)}`;

  document.querySelector("#description").innerHTML = response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = response.data.wind.speed;

}


function selectCity(location) {
  let apiKey = "a367566821d5256a1c920a360eab8e9e";
  let tempUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  axios.get(tempUrl).then(getCurrentWeather);
}

function showCity(event) {
  event.preventDefault();
  let location = document.querySelector("#city-selector").value;
  selectCity(location);
}



let city = document.querySelector("#type-city");
city.addEventListener("submit", showCity);

function locationWeather(current) {
let latitude = current.coords.latitude;
let longitude = current.coords.longitude;
let apiKey = "a367566821d5256a1c920a360eab8e9e";
let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
axios.get(locationUrl).then(getCurrentWeather);
}

function displayLocalWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationWeather);
}

let myLocationButton = document.querySelector("#check-my-location");
myLocationButton.addEventListener("click", displayLocalWeather)


selectCity("Lisbon");


