var apiKey = "4YA1tHl5ENjBb5eJ7mDhzrFrqGtVqULu0hn1TZnL";

function getTodayAPOD() {
	var req = new XMLHttpRequest();

	req.open("GET", "https://go-apod.herokuapp.com/apod");

	req.addEventListener("load", function() {
		if(req.status >= 200 && req.status < 400)
		{
			var response = JSON.parse(req.response);

			/* Clears text content of captions */
			document.getElementById("todayCaption1").textContent = "";
			document.getElementById("todayCaption2").textContent = "";
			document.getElementById("todayCaption3").textContent = "";
			document.getElementById("todayCaption4").textContent = "";

			/* Clears img or iframe from todayPhotoDiv */
			var todayPhotoDivNode = document.getElementById("todayPhotoDiv");
			while(todayPhotoDivNode.hasChildNodes() == true)
			{
				todayPhotoDivNode.removeChild(todayPhotoDivNode.lastChild);
			}

			if(response.media_type == "image")
			{
				var img = document.createElement("img");
				img.id = "todayPhoto";
				document.getElementById("todayPhotoDiv").appendChild(img);

				if(response.hasOwnProperty("hdurl"))
				{
					document.getElementById("todayPhoto").src = response.hdurl;
				}
				else
				{
					document.getElementById("todayPhoto").src = response.url;
				}
			}
			else if(response.media_type == "video")
			{
				var vid = document.createElement("iframe");
				vid.id = "todayVideo";
				document.getElementById("todayPhotoDiv").appendChild(vid);

				document.getElementById("todayVideo").src = response.url;
			}

			document.getElementById("todayCaption1").textContent = "Title: " + response.title;
			document.getElementById("todayCaption2").textContent = "Date: " + response.date;
			document.getElementById("todayCaption3").textContent = "Explanation: " + response.explanation;

			if(response.hasOwnProperty("copyright"))
			{
				document.getElementById("todayCaption4").textContent = "Copyright: " + response.copyright;
			}
		}
		else
		{
			console.log("Error in network request: " + req.statusText);
		}
	});

	req.send(null);
}

/* Runs the function */
getTodayAPOD();