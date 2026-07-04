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
