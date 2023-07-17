/* Global Variables */
// https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=79d72dce3b9069375ab250973ef0058d

const apiKey = "76309451e1fbc60bbec2d42956a71ad2&units=imperial";
const apiUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";

async function fetchWeather(zip) {
  return fetch(`${apiUrl}${zip}&appid=${apiKey}`).then((response) =>
    response.json()
  );
}

async function handleSubmitForm() {
  const zip = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;

  if (!zip) {
    alert("Please enter the zip code!");
    return;
  }

  if (!content) {
    alert("How are you feeling today?");
    return;
  }

  const weatherData = await fetchWeather(zip);

  if (weatherData.cod != 200) {
    alert(weatherData.message);
    return;
  }

  const temp = weatherData.main.temp;

  // Create a new date instance dynamically with JS
  const d = new Date();
  const date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

  const data = {
    date: date,
    temp: temp,
    content: content,
  };

  //Post project data
  await postProjectData("http://localhost:8080/projectData", data);

  //Update UI
  retrieveData();
}

async function retrieveData() {
  //Get data from owr own server
  const projectData = await getProjectData();

  // Write updated data to DOM elements
  document.getElementById("content").innerHTML = projectData?.content
    ? `Content: ${projectData?.content}`
    : "-";
  document.getElementById("temp").innerHTML = projectData?.temp
    ? `Temp: ${Math.round(projectData?.temp)} degrees`
    : "-";
  document.getElementById("date").innerHTML = projectData?.date
    ? `Date: ${projectData?.date}`
    : "-";
}

async function getProjectData() {
  const response = await fetch("http://localhost:8080/projectData");
  try {
    const data = response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function postProjectData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

const generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", handleSubmitForm);

retrieveData();
