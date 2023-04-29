function displayTemp(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description"); 
   let humidityElement = document.querySelector("#humidity");
   let speedElement = document.querySelector("#speed");
   temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    speedElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "dtf7778e477bab3d041d72fc577o701e";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=Vicenza&key=dtf7778e477bab3d041d72fc577o701e&units=metric";

  axios.get(apiUrl).then(displayTemp);