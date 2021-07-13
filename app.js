const apiKey = "your_api_key";
let cityInput = document.querySelector(".search-text");
let cityHeader = document.querySelector(".city-header");
let temperature = document.querySelector(".temperature");
let descriptionHeader = document.querySelector(".description-header");
let icon = document.querySelector(".weather-icon");
let windSpeed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let cityName;

document.querySelector(".search-btn").addEventListener("click",function(){
    cityName = cityInput.value;
    cityInput.value = "";
    if(/^[a-zA-Z]+$/.test(cityName)){
        serverRequest(cityName);
    }else {
        alert("Enter valid city name");
    }
})

function serverRequest(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => {
        if(!res.ok) {
            throw new Error("Invalid city name");
        }
        return res.json()
    })
    .then(res => {
        changeWeather(res);
    })
    .catch(err => {
        alert(err.message);
    });
}

function changeWeather(weatherAPI){
    const body = document.querySelector("body");
    body.style.backgroundImage = `url("images/${weatherAPI.weather[0].main}.jpg")`;

    document.querySelector(".weather-container").style.visibility = "visible";

    cityHeader.textContent = weatherAPI.name;

    temperature.innerHTML = Math.round(weatherAPI.main.temp) + '&#176';

    descriptionHeader.textContent = weatherAPI.weather[0].description.slice(0,1).toUpperCase() + weatherAPI.weather[0].description.slice(1);

    icon.src = "http://openweathermap.org/img/wn/" + weatherAPI.weather[0].icon + "@2x.png";

    windSpeed.textContent = `Winds at in ${Math.round(weatherAPI.wind.speed)} m/s`;

    humidity.textContent = `Humidity levels at ${Math.round(weatherAPI.main.humidity)}%`;
}

