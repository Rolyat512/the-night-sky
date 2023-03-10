var leftBtn = $("#btnOne");
var rightBtn = $("#btnTwo");
var imgEl = document.createElement("img");
var mainEl = document.getElementById("main")

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