var leftBtn = $("#btnOne");
var rightBtn = $("#btnTwo");
var imgEl = document.createElement("img");
var mainEl = document.getElementById("main")
var btnSearchEl = document.getElementById("btnSearch")
var userInput = $("#search")

function imageInfo() {
    imgEl.setAttribute("src", "./testing-images/image-1.jpg");
    mainEl.appendChild(imgEl);
}

imageInfo()

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
    .then((data) => console.log(data));
  
    for(let i = 0; i < data.result.length; i++) {
      var mainUl = document.createElement('li');
      mainUl.innerHTML = data.result[i].main;
      mainUl.appendChild(mainEl);
      }
      console.log("Received!!");
    }

    btnSearchEl.addEventListener("click", function() {
        getApiSearch()
        
      })