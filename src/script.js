function formatDate(timestamp) {
    let date = new Date(timestamp);
  
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()]; 
    return `${day} ${formatHours(timestamp)}`; 

}

function displayWeatherCondition(response) {
    let dateElement = document.querySelector("#day-time");
    let iconElement = document.querySelector("#icon");
    celsiusTemperature = response.data.main.temp;


    document.querySelector("#mainCity").innerHTML = response.data.name;
    document.querySelector("#currently-temp").innerHTML = Math.round(celsiusTemperature);
    document.querySelector("#humidity").innerHTML = (response.data.main.humidity);
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description); 
}

function formatHours(timestamp) {
   
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) { 
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;    
    }
    return `${hours}:${minutes}`;
  }

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    
  

    for (let index =0; index < 6; index++) {
        forecast = response.data.list[index];   
        forecastElement.innerHTML += `
        <div class="col-2">
          <h3>
            ${formatHours(forecast.dt * 1000)}
          </h3>
          <img
            src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png";
          />
          <div class="weather-forecast-temperature">
            <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
          </div>
        </div>
        `; 
    }

       
    }

 
function searchCity(city) {
    let apiKey = "a4f368f83069f68add8ec6eaccdc6185";
    let endPoint = `https://api.openweathermap.org/data/2.5/weather?`
    let units = `metric`
    let apiUrl = `${endPoint}q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);

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
    let apiUrl = `${endPoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`; 
    axios.get(apiUrl).then(displayWeatherCondition);


}

function dislpayWeatherFahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let elementTemperature = document.querySelector("#currently-temp");
    elementTemperature.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event) {
    event.preventDefault(); 
    let elementTemperature = document.querySelector("#currently-temp");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    
    elementTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature  = null;

let fahrenheitLink = document.querySelector("#unit-fahrenheit");
fahrenheitLink.addEventListener("click", dislpayWeatherFahrenheit);

let celsiusLink = document.querySelector("#unit-celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


searchCity("London");




function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button"); 
currentLocationButton.addEventListener("click", getCurrentLocation); 



