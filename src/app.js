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
      "Sun",
      "Mon",
      "Tues",
       "Wed",
      "Thurs",
       "Fri",
      "Sat",
          ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayForecast(){
  let forecastElement = document.querySelector("#forecast");
let forecastHTML = `<div class="row">`;
let days = ["Thurs", "Fri", "Sat", "Sun", "Mon"];

days.forEach(function (day){
 forecastHTML = forecastHTML + `
  <div class="col-2">
    <div class="weather-forecast-date">${day}
      </div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-night.png" alt="" width="49"
    />
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">
        72°
      </span>
      <span class="weather-forecast-temperature-min">
        53°
      </span>     
     </div>
  </div>
`;
});
 
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
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
}

function search(city){
  let apiKey = "dtf7778e477bab3d041d72fc577o701e";
let apiUrl =
`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp); 
}

function handleSearch(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemp(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
   let fahrenheitTemp = (celsiusTemp * 9)/ 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp); 
}

function displayCelsiusTemp(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemp);
 
  let celsiusTemp = null;

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSearch);

search("Vicenza");
displayForecast();