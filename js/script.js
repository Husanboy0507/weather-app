import countries from "../dataBase.js";

document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "d6f30ee036340502604d3238eb773649";

  const submitBtn = document.querySelector("#searchBtn");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const cityInput = document.querySelector("#cityInput");
    const cityName = cityInput.value;
    cityInput.value = "";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=eng`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const countryFullName = data.sys.country
        const country = countries[countryFullName] || "Unknown country"

        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString()

        const iconCode = data.weather[0].icon
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;


        const cardBody = document.querySelector(".card__body");
        cardBody.innerHTML = `
          <h1>Name: ${data.name}</h1>
          <h2>Davlat: ${country}</h2>
          <h3> Temperatura: ${data.main.temp} °C </h3>
          <h4> Quyosh chiqishi: ${sunrise}</h4>
          <h5> Quyosh botishi: ${sunset}</h5>
          <h6> Osmon: ${data.weather[0].main}</h6>
          <img src="${iconUrl}" >

        `;
      })
      .catch((error) => {
        console.log(error);
      });
    });
});
const loader = document.querySelector('.loaderFix')

setTimeout(() => {
    loader.style.opacity = '0.7'
}, 1700);

setTimeout(() => {
    loader.style.display = 'none'
}, 1800);





