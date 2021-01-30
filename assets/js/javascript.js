//moment().format('L');

var citySearchHistory = []


var memorySet = function () {
    localStorage.setItem("citySearchHistory", JSON.stringify(citySearchHistory))
}

var memoryLoad = function () {
    citySeachHistory = JSON.parse(localStorage.getItem("citySearchHistory")) || [];
}

function myFunction() {

    let cityName = document.querySelector('#city-search').value;

    fetch(
        'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=a4dc6b4797cfe0a360daceabbd77f8dc'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.name);
            console.log(data);
            // const {}

            $("#current-weather").empty();
            var mainDate = moment().format('L');

            var cityNameEl = $("<h2>").text(data.name);
            var displayMainDate = cityNameEl.append(" " + mainDate);
            var tempEL = $("<p>").text("Tempature: " + data.main.temp);
            var humEl = $("<p>").text("Humidity: " + data.main.humidity);
            var windEl = $("<p>").text("Wind Speed: " + data.wind.speed);

            //create HTML div to append new elements to render on page....
            var newDiv = $('<div>');

            newDiv.append(displayMainDate, tempEL, humEl, windEl);

            $("#current-weather").html(newDiv);

            fetch('http://api.openweathermap.org/data/2.5/uvi?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&units=imperial&appid=a4dc6b4797cfe0a360daceabbd77f8dc'
            )
                .then(function (response) {
                    return response.json();
                })
                .then(function (currentUvData) {
                    console.log(currentUvData);
                    var uvIndex = $("<span>").text("Uv Index: " + currentUvData.value);

                    var updateBackground = function () {
                        // call the specific hour
                        let hour = parseInt(date.format('H'));
                        //TEST hour -= 7
                        for (i = 9; i < 18; i++) {
                            var textArea = $("#" + i);
                            // classes for favorab;e, moderate, severe come from CSS
                            // condition 1
                            if (i < hour) {
                                textArea.addClass("favorable")
                            }
                            // conditon 2 
                            else if (i === hour) {
                                textArea.addClass("moderate")
                            }
                            // condition 3
                            else {
                                textArea.addClass("severe")

                            }
                            //for (i = 0; i < 12; i++) {
                            //      if (i == )
                            //  }

                            newDiv.append(uvIndex);
                            //console.log(currentUvData);
                        }
                    }
                })


        });
}
$(document).ready(function () { "memoryLoad" }); 