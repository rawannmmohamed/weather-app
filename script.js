$(document).ready(function () {
    $('.form').submit(function (event) {
        
        performSearch(event);
    });
});


const performSearch = event => {
    event.preventDefault();
    $.ajax(
        {
            url: "http://api.openweathermap.org/data/2.5/weather",
            method: 'GET',
            data: {
                q: $('.form-control').val(),
                appid: '5950f93f5a0140545f974f4739e4d52b',
                units: 'metric',
            }
        }
    )
        .done(function (response) {
            formatSearch(response);
        })
        .fail(function (error) {
            console.error('Request failed:', error);
        });
};

function formatSearch(jsonObj) {
    let cityName = jsonObj.name;
    let temperature = jsonObj.main.temp;
    let humidity = jsonObj.main.humidity;
    let wind = jsonObj.wind.speed;
    let weather = jsonObj.weather[0].main;
    let imgSrc = '';

    if (weather == 'Rain') {
        imgSrc = "images/rain.png"
    }
    else if (weather == 'Clear') {
        imgSrc = "images/clear.png"
    }
    else if (weather == 'Clouds') {
        imgSrc = "images/clouds.png"
    }
    else if (weather == 'Drizzle') {
        imgSrc = "images/drizzle.png"
    }
    else if (weather == 'Mist') {
        imgSrc = "images/mist.png"
    }
    else if (weather == 'Snow') {
        imgSrc = "images/snow.png"
    }




    $("#city").text(cityName);
    $("#temp").text(parseInt(temperature) + "°C");
    $("#humidity").html(`(Humidity)  ${parseInt(humidity)}% <img src="images/humidity.png">`);
    $("#wind").html(`(Wind)  ${wind}km/h  <img src="images/wind.png">`);
    $("#icon").html(`<img src=${imgSrc}>`);

    $("#temp, #city, #humidity, #wind, #icon").addClass("show");

}
