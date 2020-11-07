//current time
moment().format('L');
//function for selcting weather by city and collecting data from api
citySearch = (cityName) => {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
    //let queryURLFor = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
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
        console.log(showMainDate)
        console.log(elemTemp)
        console.log(elemHumid)
        console.log(elemWind)
        console.log(weatherNow)
        console.log(elemCity)
    })
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

}