
moment().format('L');

searchCity = (cityname) => {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=41f2a77b0d56cefa2ce519649da7b226";
    let queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=41f2a77b0d56cefa2ce519649da7b226";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);

        $("#current").empty();
        let mainDate = moment().format('L');

        let cityNameEl = $("<h2>").text(response.name);
        let displayMainDate = cityNameEl.append(" " + mainDate);
        var tempP = $("<p>").text("Temp: " + response.main.temp);
        var humP = $("<p>").text("Humidity: " + response.main.humidity);
        var windP = $("<p>").text("Wind Speed: " + response.wind.speed);
        var currentweather = response.weather[0].main;

        if (currentweather === "Rain") {
            var currentIcon = $('<img>').attr("src", "");
            currentIcon.attr("style", "height: 60px; width: 60px");
        } else if (currentweather=== "Clouds") {
            var currentIcon = $('<img>').attr("src", "");
            currentIcon.attr("style", "height: 60px; width: 60px");
        } else if (currentweather === "Clear") {
            var currentIcon = $('<img>').attr("src", "");
            currentIcon.attr("style", "height: 60px; width: 60px");
        }
         else if (currentweather === "Drizzle") {
            var currentIcon = $('<img>').attr("src", "");
            currentIcon.attr("style", "height: 60px; width: 60px");
        }
         else if (currentweather === "Snow") {
            var currentIcon = $('<img>').attr("src", "");
            currentIcon.attr("style", "height: 60px; width: 60px");
        }
        
        var newDiv = $('<div>');

        newDiv.append(displayMainDate, currentIcon, tempEL, humEl, windEl);

        $("#current").html(newDiv);

    });
};