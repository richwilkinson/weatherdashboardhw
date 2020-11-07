//current time
moment().format('L');
//function for selcting weather by city and collecting data from api
citySearch = (cityName) => {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
    let queryURLFor = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
//api call
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
//prepping div for content insertion
        $("#present").empty();
       let presDate = moment().format('L');
        console.log(citySearch());
//html elements for city weather info
        let elemCity = $("<h2>").text(response.name);
        let showMainDate = elemCity.append(" " + presDate);
        let elemTemp = $("<p>").text("Temp : " + response.main.temp);
        let elemHumid = $("<p>").text("Humidity : " + response.main.humidity);
        let elemWind = $("<p>").text("Wind Velocity :" + response.wind.speed);
        let weatherNow = response.weather[0].main;

        if (weatherNow === "Rain") {
            let weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        } else if (weatherNow === "Clouds") {
            let weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        } else if (weatherNow === "Clear") {
            let weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        } else if (weatherNow === "Drizzle") {
            let weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        } else if (weatherNow === "Snow") {
            let weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        }

        let newDiv = $('<div>');
        newDiv.append(showMainDate, weatherIcon, elemTemp, elemWind, elemHumid);
        $("#current").html(newDiv);

        let latPush = response.coord.lat;
        let lonPush = response.coord.lon;
        let queryURLLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" + lat  + "&lon=" + lon;

        $.ajax({
            url: queryURLLUV,
            method: 'GET'
        }).then(function (response) {
            $('#uv-display').epmty();
            let uvResults = response.value;

            let elemUV = $("<button class='btn bg-warning'>").text("UV index : " + response.value);
            
            $('#uv-display').html(elemUV);
        });
    });

    $.ajax({
        url: queryURLFor,
        method: 'GET'
    }).then(function (response) {
        let weatherRes = response.list;

        $("#fDay").empty();

        for (var i = 0; i < results.length; i+= 8) {

            let forecastDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
            let date = results[i].dt_txt;
            let divDate = date.substr(0.10);
            let temp = results[i].main.temp;
            let hum = results[i].main.humidity;

            let headDate = $("<h5 class='card-title'>").text(divDate);
            let tempP = $("<p class='card-text'>").text("Temp: " + temp);
            let humP = $("<p class='card-text'>").text("Humidity " + hum);

            let weather = results[i].weather[0].main;

            if (weather === "Rain") {
                let weathIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                weathIcon.attr("style", "height: 40px; width: 40px");
            } else if (weather === "Clouds") {
                let weathIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                weathIcon.attr("style", "height: 40px; width: 40px");
            } else if (weather === "Clear") {
                let weathIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                weathIcon.attr("style", "height: 40px; width: 40px");
            } else if (weather === "Drizzle") {
                let weathIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                weathIcon.attr("style", "height: 40px; width: 40px");
            } else if (weather === "Snow") {
                let weathIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                weathIcon.attr("style", "height: 40px; width: 40px");
            };
            
            forecastDiv.append(headDate);
            forecastDiv.append(weathIcon);
            forecastDiv.append(tempP);
            forecastDiv.append(humP);
            $("#fday").append(forecastDiv);
        }
    });
    pageload();
}

$("#choose-city").on("click", function (event) {
    event.preventDefault();

    let cityChoice = $("#city-text").val().trim();

    let cityContent = $(this).siblings("input").val();
    let cityarr = [];
    cityarr.push(cityContent);
    localStorage.setItem('cityName', JSON.stringify(cityarr));
    citySearch(cityChoice);
    console.log(cityChoice);  
});

loadStats = () => {
let statSearch =JSON.parse(localStorage.getItem('cityName'));
let searchB = $("<button class ='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem'>").text(statSearch);
let searchD = $("<div>");
searchD.append(searchB);
$("#searchedWeather").prepend(searchD);    
}

$("#searchedWeather").on('click', '.btn', function(event) {
    event.preventDefault();
    console.log($(this).text());
    citySearch($(this).text());  
});