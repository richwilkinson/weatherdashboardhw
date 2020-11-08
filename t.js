moment().format('L');


    renderStats = () => {
        let searchedWeather = JSON.parse(localStorage.getItem("cityName"));
        let searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(searchedWeather);
        let searchText = $("<div>");
        searchText.append(searchDiv)
        $("#searches").prepend(searchText);
    }
userSearch = (cityname) => {

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
    let queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
        
        $("#current").empty();
       let currDate = moment().format('L');
 

        
        let cityText = $("<h2>").text(response.name);
        let displayCurrDate = cityText.append(" " + currDate);
        let elemTemp = $("<p>").text("Tempraturer: " + response.main.temp);
        let elemHumid = $("<p>").text("Humidity: " + response.main.humidity);
        let elemWind = $("<p>").text("Wind Speed: " + response.wind.speed);
        let weather = response.weather[0].main;

        if (weather === "Rain") {
            var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        } else if (weatherIcon === "Clouds") {
            var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        } else if (weatherIcon === "Clear") {
            var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        }
         else if (weather === "Drizzle") {
            var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        }
         else if (weather === "Snow") {
            var weatherIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            weatherIcon.attr("style", "height: 60px; width: 60px");
        }
        
        var newDiv = $('<div>');

        newDiv.append(displayCurrDate, weatherIcon, elemTemp, elemHumid, elemWind);

        $("#current").html(newDiv);
        


let latPush = response.coord.lat;
let lonPush = response.coord.lon;
let queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" + latPush  + "&lon=" + lonPush;

        $.ajax({
            url: queryURLUV,
            method: 'GET'
        }).then(function (response) {
            $('#uvl-display').empty();
            var uvresults = response.value;
            
            var uvText = $("<button class='btn bg-success'>").text("UV Index: " + uvresults);
      
            $('#uvl-display').html(uvText);
    
        });
    });




    $.ajax({
        url: queryURLforcast,
        method: 'GET'
    }).then(function (response) {
        
        var results = response.list;
        
        $("#futurecast").empty();
        
        for (let i = 0; i < results.length; i += 8) {
            
            let forecastDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
            
            
            let date = results[i].dt_txt;
            let temp = results[i].main.temp;
            let setD = date.substr(0,10)
            let hum = results[i].main.humidity;
   
            
            let textDate = $("<h5 class='card-title'>").text(setD);
            let tDisplay = $("<p class='card-text'>").text("Temp: " + temp);;
            let hDisplay = $("<p class='card-text'>").text("Humidity " + hum);;

            let weather = results[i].weather[0].main

            if (weather === "Rain") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                icon.attr("style", "height: 40px; width: 40px");
            } else if (weather === "Clouds") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                icon.attr("style", "height: 40px; width: 40px");
            } 
             else if (weather === "Clear") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }
             else if (weather === "Drizzle") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }
             else if (weather === "Snow") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }

            
            forecastDiv.append(textDate);
            forecastDiv.append(icon);
            forecastDiv.append(tDisplay);
            forecastDiv.append(hDisplay);
            $("#futurecast").append(forecastDiv);
        }

    });



}
renderStats();


$("#select-city").on("click", function (event) {
    
    event.preventDefault();
    
    var cityInput = $("#city-input").val().trim();

    
    var userContent = $(this).siblings("input").val();
    var cityarr = [];
    cityarr.push(userContent);
    localStorage.setItem('cityName', JSON.stringify(cityarr));
  
    userSearch(cityInput);
    renderStats();
});




$("#searches").on('click', '.btn', function(event) {
event.preventDefault();
    console.log($(this).text());
    userSearch($(this).text());

});