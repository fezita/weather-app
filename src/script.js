

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`; 
    }
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day = days[date.getDay()]; 
    return `${day} ${hours}:${minutes}`; 

}

function displayWeatherCondition(response) {
    let dateElement = document.querySelector("#day-time");
    document.querySelector("#mainCity").innerHTML = response.data.name;
    document.querySelector("#currently-temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = (response.data.main.humidity);
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
   
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



searchCity("London");