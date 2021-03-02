let now = new Date();

let p = document.querySelector("#day-time");

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

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
 minutes = `0 ${now.getMinutes()}`;
}

p.innerHTML = `${day} ${hours}:${minutes}`;


function displayWeatherCondition(response) {
    console.log(response.data);
    document.querySelector("#mainCity").innerHTML = response.data.name;
    document.querySelector("#currently-temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = (response.data.main.humidity);
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
    let apiKey = "a4f368f83069f68add8ec6eaccdc6185";
    let endPoint = `https://api.openweathermap.org/data/2.5/weather?`
    let units = `metric`
    let apiUrl = `${endPoint}q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition);


}

function handleSubmit(event) {    
    event.preventDefault();
    let city = document.querySelector("#city-input").value; 
    searchCity(city);

}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
    let apiKey = "a4f368f83069f68add8ec6eaccdc6185";
    let endPoint = `https://api.openweathermap.org/data/2.5/weather?`;
    let units = `metric`
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`; 
    axios.get(apiUrl).then(displayWeatherCondition);


}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button"); 
currentLocationButton.addEventListener("click", getCurrentLocation); 



searchCity("Porto Alegre");