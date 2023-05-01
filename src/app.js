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
  let apiKey = "dtf7778e477bab3d041d72fc577o701e";
let apiUrl =
`https://api.shecodes.io/weather/v1/current?query=${city}&key=dtf7778e477bab3d041d72fc577o701e&units=metric`;

  axios.get(apiUrl).then(displayTemp); 
}

function handleSearch(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("city-input");
    search(cityInputElement.value);
}

search(Vicenza);

function displayFahrenheitTemp(event){
  event.preventDefault();
  let fahrenheitTemp = (13 * 9)/ 5 * 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSearch);

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemp);