//moment().format('L');

var citySearchHistory = []


var memorySet = function () {
    localStorage.setItem("citySearchHistory", JSON.stringify(citySearchHistory))
}

var memoryLoad = function () {
    citySeachHistory = JSON.parse(localStorage.getItem("citySearchHistory")) || [];
}
/*
var getHistory = function (event) {
    var city = event.target.textContent
    document.querySelector("#city-search").value = city;
    console.log(city)
}
*/
function add(cityName) {
    var element = document.createElement("li");
    element.textContent = cityName;
    element.setAttribute("value", cityName),
        element.setAttribute("class", "list-group-item");
    document.getElementById("search-history").appendChild(element);
}

function myFunction(cityName) {
    //let cityName = document.querySelector('#city-search').value;


    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=a4dc6b4797cfe0a360daceabbd77f8dc')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data);

            var cityName = data.name;
            if (!data.name) {
                return;
            }

            var duplicate = false;
            for (let i = 0; i < citySearchHistory.length; i++) {
                const element = citySearchHistory[i];
                if (element == cityName) {
                    duplicate = true;
                }
                console.log(cityName);
            }
            if (!duplicate) {
                citySearchHistory.push(cityName);
                // set to storage //
                memorySet()
                add(cityName);
            }
            fetch('https://api.openweathermap.org/data/2.5/uvi?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&units=imperial&appid=a4dc6b4797cfe0a360daceabbd77f8dc'
            )
                .then(function (response) {
                    return response.json();
                })
                .then(function (currentUvData) {
                    var uvIndex = currentUvData.value;
                    $("#current-weather").empty();
                    var mainDate = moment().format('L');
                    var cityNameEl = $("<h2>").text(data.name);
                    var displayMainDate = cityNameEl.append(" " + mainDate);
                    var tempEL = $("<p>").text("Tempature: " + data.main.temp);
                    var humEl = $("<p>").text("Humidity: " + data.main.humidity);
                    var windEl = $("<p>").text("Wind Speed: " + data.wind.speed);
                    var uvIndex = $("<span>").text("Uv Index: " + currentUvData.value);
                    // function to change uv index background color start //
                    $(document).ready(function () {
                        updateBackground();
                    });
                    // background color changes as the uv index changes 
                    var updateBackground = function () {
                        //console.log(uvIndex);
                        // condition 1
                        if (currentUvData.value < 4) {
                            uvIndex.addClass("favorable")
                        }
                        // conditon 2 
                        else if (currentUvData.value < 8) {
                            uvIndex.addClass("moderate")
                        }
                        // condition 3
                        else if (currentUvData.value < 15) {
                            uvIndex.addClass("severe")
                        }
                    }
                    // function to change uv index background color end //




                    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=hourly,minutely,alerts&units=imperial&appid=a4dc6b4797cfe0a360daceabbd77f8dc'
                    )
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (fiveDayForecast) {
                            // very repetative but ran out of time trying to input dynamically //
                            // future 5 day forecast day 1 //
                            //console.log(fiveDayForecast);
                            var forecastIcon = fiveDayForecast.daily[1].weather[0].icon
                            var url = "https://openweathermap.org/img/wn/" + forecastIcon + ".png"
                            document.getElementById("day-1").textContent = moment().add(1, "day").format("L");
                            document.getElementById("day-1-icon").setAttribute("src", url);
                            document.querySelector(".temp-1").textContent = fiveDayForecast.daily[1].temp.max;
                            document.querySelector(".hum-1").textContent = fiveDayForecast.daily[1].humidity;
                            // future 5 day forecast day 1 //
                            var forecastIcon = fiveDayForecast.daily[2].weather[0].icon
                            var url = "https://openweathermap.org/img/wn/" + forecastIcon + ".png"
                            document.getElementById("day-2").textContent = moment().add(2, "day").format("L");
                            document.getElementById("day-2-icon").setAttribute("src", url);
                            document.querySelector(".temp-2").textContent = fiveDayForecast.daily[2].temp.max;
                            document.querySelector(".hum-2").textContent = fiveDayForecast.daily[2].humidity;
                            // future 5 day forecast day 1 //
                            var forecastIcon = fiveDayForecast.daily[3].weather[0].icon
                            var url = "https://openweathermap.org/img/wn/" + forecastIcon + ".png"
                            document.getElementById("day-3").textContent = moment().add(3, "day").format("L");
                            document.getElementById("day-3-icon").setAttribute("src", url);
                            document.querySelector(".temp-3").textContent = fiveDayForecast.daily[3].temp.max;
                            document.querySelector(".hum-3").textContent = fiveDayForecast.daily[3].humidity;
                            // future 5 day forecast day 1 //
                            var forecastIcon = fiveDayForecast.daily[4].weather[0].icon
                            var url = "https://openweathermap.org/img/wn/" + forecastIcon + ".png"
                            document.getElementById("day-4").textContent = moment().add(4, "day").format("L");
                            document.getElementById("day-4-icon").setAttribute("src", url);
                            document.querySelector(".temp-4").textContent = fiveDayForecast.daily[4].temp.max;
                            document.querySelector(".hum-4").textContent = fiveDayForecast.daily[4].humidity;
                            // future 5 day forecast day 1 //
                            var forecastIcon = fiveDayForecast.daily[5].weather[0].icon
                            var url = "https://openweathermap.org/img/wn/" + forecastIcon + ".png"
                            document.getElementById("day-5").textContent = moment().add(5, "day").format("L");
                            document.getElementById("day-5-icon").setAttribute("src", url);
                            document.querySelector(".temp-5").textContent = fiveDayForecast.daily[5].temp.max;
                            document.querySelector(".hum-5").textContent = fiveDayForecast.daily[5].humidity;

                            // current day append image to //
                            var forecastIcon = fiveDayForecast.daily[0].weather[0].icon
                            var url = "https://openweathermap.org/img/wn/" + forecastIcon + ".png"
                            var image = $('<img>')
                            image.attr("src", url);
                            //create HTML div to append new elements to render on page....
                            displayMainDate.append(image);
                            var newDiv = $('<div>');
                            newDiv.append(displayMainDate, tempEL, humEl, windEl, uvIndex);
                            $("#current-weather").html(newDiv);
                        })
                });


        });
}
// button listener for search //
$("#search-button").on("click", function () {
    let cityName = document.querySelector('#city-search').value;
    myFunction(cityName);
});
// button listener for populated list //
$("#search-history").on("click", function (event) {
    var btn = event.target
    myFunction(btn.textContent);
});
