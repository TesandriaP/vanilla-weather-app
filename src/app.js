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

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
       "Wednesday",
      "Thursday",
       "Friday",
      "Saturday",
          ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
let date = new Date(timestamp * 1000);

let day = date.getDay();
let days = [
  "Sun",
  "Mon",
  "Tues",
   "Wed",
  "Thu",
  "Fri",
  "Sat",
];

return days[day];
}

function displayForecast(response){
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;

forecast.forEach(function (forecastDay, index){
if (index < 6){

 forecastHTML = forecastHTML + `
  <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.time)}
      </div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" 
    alt=""
   width="49"
   id="icon"
    />
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">
        ${Math.round(forecastDay.temperature.maximum)}°
      </span>
      <span class="weather-forecast-temperature-min">
      ${Math.round(forecastDay.temperature.minimum)}°
      </span>     
     </div>
  </div>
`;
}
});
 
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
  
  let apiKey = "dtf7778e477bab3d041d72fc577o701e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description"); 
   let humidityElement = document.querySelector("#humidity");
   let speedElement = document.querySelector("#speed");
   let iconElement = document.querySelector("#icon");
   let dateElement = document.querySelector("#date");
   let feelsLikeElement = document.querySelector("#feels-like");

   celsiusTemp = response.data.temperature.current;
   temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
    speedElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute(
        "src", response.data.condition.icon_url);
    iconElement.setAttribute(
        "alt", response.data.condition.description
        );

        getForecast(response.data.coordinates);
}

function search(city){
  let apiKey = "dtf7778e477bab3d041d72fc577o701e";
let apiUrl =
`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemp); 
}

function handleSearch(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSearch);

search("Vicenza");