var leftBtn = $("#btnOne");
var rightBtn = $("#btnTwo");
var imgEl = document.createElement("img");
var mainEl = document.getElementById("main")
var btnSearchEl = document.getElementById("btnSearch")
var userInput = $("#search")
var mainUl = document.getElementById("weatherList")

function createList() {
    mainEl.appendChild(mainUl)
}

function imageInfo() {
    imgEl.setAttribute("src", "./testing-images/image-1.jpg");
    mainEl.appendChild(imgEl);
}

imageInfo()
createList()

leftBtn.on("click", function() {
    console.log("Left button works!!")
    if (imgEl.getAttribute("src") === "./testing-images/image-1.jpg") {
        imgEl.setAttribute("src", "./testing-images/image-4.jpg")
        console.log("Line 15 works")
    } else if (imgEl.getAttribute("src") === "./testing-images/image-4.jpg") {
        imgEl.setAttribute("src", "./testing-images/image-3.jpg")
        console.log("Line 18 works")
    } else if (imgEl.getAttribute("src") === "./testing-images/image-3.jpg") {
        imgEl.setAttribute("src", "./testing-images/image-2.jpeg")
        console.log("Line 21 works")
    } else if (imgEl.getAttribute("src") === "./testing-images/image-2.jpeg") {
        imgEl.setAttribute("src", "./testing-images/image-1.jpg")
        console.log("Line 24 works")
    }
})

rightBtn.on("click", function() {
    console.log("Right button works!!")
    if (imgEl.getAttribute("src") === "./testing-images/image-1.jpg") {
        imgEl.setAttribute("src", "./testing-images/image-2.jpeg")
        console.log("Line 34 works")
    } else if (imgEl.getAttribute("src") === "./testing-images/image-2.jpeg") {
        imgEl.setAttribute("src", "./testing-images/image-3.jpg")
        console.log("Line 37 works")
    } else if (imgEl.getAttribute("src") === "./testing-images/image-3.jpg") {
        imgEl.setAttribute("src", "./testing-images/image-4.jpg")
        console.log("Line 40 works")
    } else if (imgEl.getAttribute("src") === "./testing-images/image-4.jpg") {
        imgEl.setAttribute("src", "./testing-images/image-1.jpg")
        console.log("Line 43 works")
    }
})

function getApiSearch() {
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput.val() + "&appid=62b78fd432f4f7c034943f7f3abc8315&units=imperial";
  // Search bar
  fetch(requestUrl)
  .then((response) => response.json())
  .then((data) => {
console.log(data)
    for(let i = 0; i < data.list.length; i++) {
      var mainListOne = document.getElementById('listOne');
      var mainListTwo = document.getElementById('listTwo');
      var mainListThree = document.getElementById('listThree');
      var mainListFour = document.getElementById('listFour');
      mainListOne.innerHTML = "Current Temp: " + data.list[i].main.temp + "°F";
      mainListTwo.innerHTML = "Feels Like: " + data.list[i].main.feels_like + "°F";
      mainListThree.innerHTML = "Today's High: " + data.list[i].main.temp_max + "°F";
      mainListFour.innerHTML = "Today's Low: " + data.list[i].main.temp_min + "°F";
      mainUl.appendChild(mainListOne);
      mainUl.appendChild(mainListTwo);
      mainUl.appendChild(mainListThree);
      mainUl.appendChild(mainListFour);
      console.log(data.list[0].main.temp)
      console.log(data.list[0].main.feels_like)
      console.log(data.list[0].main.temp_max)
      console.log(data.list[0].main.temp_min)
    }
    console.log("Received!!");
  });
}
    btnSearchEl.addEventListener("click", function() {
        getApiSearch()
        
      })