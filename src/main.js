const eyebrow = document.querySelector(".eyebrow");
const clock = document.querySelector(".clock");
const date = document.querySelector(".date");

function getGreeting(hours) {
  if (hours < 12) { // before 12:00
    return "Good morning";
  } else if (hours < 18) {
    return "Good afternoon"; // 12:01 - 5:59
  } else {
    return "Good evening"; // after 6:00
  }
}

// 12 hour clock
function getTime(now) {
  let hours = now.getHours() % 12;
  if (hours === 0) {
    hours = 12;
  }
  const minutes = now.getMinutes();
  return `${hours}:${String(minutes).padStart(2, "0")}`;
}

function getDate(now) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  return `James - ${day}, ${month} ${now.getDate()}`;
}

// clock updating with the functions
function update() {
  const now = new Date();
  eyebrow.innerHTML = getGreeting(now.getHours());
  clock.innerHTML = getTime(now);
  date.innerHTML = getDate(now);
}

// run it once then run it every second
update();
setInterval(update, 1000);

// google search stuff
const searchInput = document.querySelector(".search input");

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    if (query !== "") {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  }
});

// open meteo weather data
const weatherTemp = document.querySelector(".weather-temp");
const weatherCondition = document.querySelector(".weather-condition");

const FALLBACK_LAT = import.meta.env.VITE_LATITUDE;
const FALLBACK_LON = import.meta.env.VITE_LONGITUDE;

function describeWeather(code) {
  if (code === 0) return "Clear";
  if (code <= 2) return "Mostly clear";
  if (code === 3) return "Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  return "Stormy";
}

// load weather based on lat and lon
function loadWeather(lat, lon) {
  if (lat == null || lon == null || lat === "" || lon === "") {
    weatherTemp.innerHTML = "--°";
    weatherCondition.innerHTML = "Unavailable";
    return;
  }
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`)
    .then((response) => response.json())
    .then((data) => {
      const temp = Math.round(data.current.temperature_2m);
      weatherTemp.innerHTML = `${temp}°`;
      weatherCondition.innerHTML = describeWeather(data.current.weather_code);
    })
    .catch((err) => {
      weatherTemp.innerHTML = "--°";
      weatherCondition.innerHTML = "Unavailable";
    });
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => loadWeather(position.coords.latitude, position.coords.longitude),
    () => loadWeather(FALLBACK_LAT, FALLBACK_LON), // fallback if no loc
    { timeout: 5000 }
  );
} else {
  loadWeather(FALLBACK_LAT, FALLBACK_LON);
}
