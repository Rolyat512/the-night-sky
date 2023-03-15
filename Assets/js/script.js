var apiKey = "4YA1tHl5ENjBb5eJ7mDhzrFrqGtVqULu0hn1TZnL";
// Variables for Weather API
var mainEl = document.getElementById("main");
var btnSearchEl = document.getElementById("btnSearch");
var userInput = $("#search");
var mainUl = document.getElementById("weatherList");
var store;
var weatherEl = document.getElementById("weather-main");

const populateStorage = async () => {
  store = (await localStorage.cities) ? JSON.parse(localStorage.cities) : [];

  if (!store.length) return;

  store.forEach((city) => {
    optSearch.innerHTML += `<option>${city}</option>`;
  });
};

populateStorage();

function getTodayAPOD() {
  var req = new XMLHttpRequest();

  req.open("GET", "https://go-apod.herokuapp.com/apod");

  req.addEventListener("load", function () {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.response);
      console.log(response);

      /* Clears text content of captions */
      document.getElementById("todayCaption1").textContent = "";
      document.getElementById("todayCaption2").textContent = "";
      document.getElementById("todayCaption3").textContent = "";
      document.getElementById("todayCaption4").textContent = "";

      /* Clears img or iframe from todayPhotoDiv */
      var todayPhotoDivNode = document.getElementById("todayPhotoDiv");
      while (todayPhotoDivNode.hasChildNodes() == true) {
        todayPhotoDivNode.removeChild(todayPhotoDivNode.lastChild);
      }

      if (response.media_type == "image") {
        var img = document.createElement("img");
        img.id = "todayPhoto";
        document.getElementById("todayPhotoDiv").appendChild(img);

        if (response.hasOwnProperty("hdurl")) {
          document.getElementById("todayPhoto").src = response.hdurl;
        } else {
          document.getElementById("todayPhoto").src = response.url;
        }
      } else if (response.media_type == "video") {
        var vid = document.createElement("iframe");
        vid.id = "todayVideo";
        document.getElementById("todayPhotoDiv").appendChild(vid);

        document.getElementById("todayVideo").src = response.url;
      }

      document.getElementById("todayCaption1").textContent =
        "Title: " + response.title;
      document.getElementById("todayCaption2").textContent =
        "Date: " + response.date;
      document.getElementById("todayCaption3").textContent =
        "Explanation: " + response.explanation;

      if (response.hasOwnProperty("copyright")) {
        document.getElementById("todayCaption4").textContent =
          "Copyright: " + response.copyright;
      }
      var apodPhoto = response.hdurl;
      var apodSaved = $("#save");

      save.addEventListener("click", function () {
        localStorage.setItem("favoritephoto", JSON.stringify(apodPhoto));
        JSON.parse(localStorage.getItem("favoritephoto"));
      });
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });

  req.send(null);
}

/* Runs the function */
getTodayAPOD();

// Creates list for Weather API data
function createList() {
  mainEl.appendChild(mainUl);
}

// Runs function
createList();

function getApiSearch() {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    userInput.val() +
    "&appid=62b78fd432f4f7c034943f7f3abc8315&units=imperial";
  // Fetches data from API
  fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
      // Console logs the data to check that function is returning the proper data
      console.log(data);

      if (!store.includes(userInput.val())) {
        store.push(userInput.val());
        localStorage.cities = JSON.stringify(store);
        populateStorage();
      }

      // For loop to grab all the data required
      for (let i = 0; i < data.list.length; i++) {
        var mainListOne = document.getElementById("listOne");
        var mainListTwo = document.getElementById("listTwo");
        var mainListThree = document.getElementById("listThree");
        var mainListFour = document.getElementById("listFour");
        var mainListFive = document.getElementById("listFive");
        var mainListSix = document.getElementById("listSix");
        var locationIcon = document.getElementById("weather-icon");
        var { icon } = data.list[0].weather[0];

        locationIcon.src = `http://openweathermap.org/img/w/${icon}.png`;

        function cloudConditions() {
          var cloudResponse = data.list[0].clouds.all;
          console.log(cloudResponse);
          if (cloudResponse >= 0 && cloudResponse <= 25) {
            mainListSix.innerHTML = "It's clear out!";
          } else if (cloudResponse > 25 && cloudResponse <= 60) {
            mainListSix.innerHTML = "It's partly cloudy!";
          } else if (cloudResponse > 60 && cloudResponse <= 75) {
            mainListSix.innerHTML = "It's mostly cloudy!";
          } else if (cloudResponse > 75) {
            mainListSix.innerHTML = "It's cloudy out!";
          }
        }

        cloudConditions();
        // Grabs data that we want to display
        mainListOne.innerHTML =
          "Current Temp: " + data.list[0].main.temp + "°F";
        mainListTwo.innerHTML =
          "Feels Like: " + data.list[0].main.feels_like + "°F";
        mainListThree.innerHTML =
          "Today's High: " + data.list[0].main.temp_max + "°F";
        mainListFour.innerHTML =
          "Today's Low: " + data.list[0].main.temp_min + "°F";
        mainListFive.innerHTML =
          "Weather Conditions: " + data.list[0].weather[0].description;

        // Appends data to HTML document
        mainUl.appendChild(mainListOne);
        mainUl.appendChild(mainListTwo);
        mainUl.appendChild(mainListThree);
        mainUl.appendChild(mainListFour);
        mainUl.appendChild(mainListFive);
        mainUl.appendChild(mainListSix);

        // Console logs the data just to double check
        console.log(data.list[0].main.temp);
        console.log(data.list[0].main.feels_like);
        console.log(data.list[0].main.temp_max);
        console.log(data.list[0].main.temp_min);
        console.log(data.list[0].weather[0].description);
        console.log(data.list[0].weather[0].icon);
      }

      localStorage.setItem("User Input", userInput.val());

      console.log("Received!!");
    });
}
// Adds event listener for Search button for API
btnSearchEl.addEventListener("click", function () {
  getApiSearch();
});
