function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
      }
    let days = ["Sunday", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayTemp(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description"); 
   let humidityElement = document.querySelector("#humidity");
   let speedElement = document.querySelector("#speed");
   let iconElement = document.querySelector("#icon");
   temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    speedElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute(
        "src",
    'http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-night.png'
    );
    iconElement.setAttribute(
        "alt", response.data.condition.description
        );
}

function search(city){
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
let city = "Vicenza";
let apiUrl =
'https://api.shecodes.io/weather/v1/current?query=${city}&key=bd79ao40tde3dec118ca46bc3e6dd55f&units=metric';

  axios.get(apiUrl).then(displayTemp); 
}

function handleSearch(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("city-input");
    search(cityInputElement.value);
}


  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSearch);