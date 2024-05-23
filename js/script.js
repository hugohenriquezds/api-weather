const keyAPI = "909dc63875532bae68eef576118e5ebb";

document
  .querySelector("#search_city")
  .addEventListener("submit", async (Event) => {
    Event.preventDefault();

    const cityName = document.querySelector("#cityName").value;

    const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      cityName
    )}&appid=${keyAPI}&units=metric&lang=pt_br`;

    if (!cityName) {
      return showAlert("Voce precisa digitar uma cidade");
    }

    const results = await fetch(urlAPI);
    const json = await results.json();

    if (json.cod == 200) {
      showInfo({
        city: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        humidity: json.main.humidity,
        description: json.weather[0].description,
      });
    } else {
      showAlert("Não foi possivel localizar");
    }

    console.log(cityName);
    console.log(json);
  });

function showAlert(msg) {
  document.querySelector("#Alert").innerHTML = msg;
}

function showInfo(json) {
  document.querySelector("#city").innerHTML = `${json.city} , ${json.country}`;
  document.querySelector("#description").innerHTML = `${json.description}`;
  document.querySelector("#temp").innerHTML = `temperatura : ${json.temp}°C`;
  document.querySelector("#humidity").innerHTML = `humidade: ${json.humidity}%`;
}
