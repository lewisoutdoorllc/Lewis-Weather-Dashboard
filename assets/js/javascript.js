//moment().format('L');





var citySearchHistory = []


var memorySet = function () {
    localStorage.setItem("citySearchHistory", JSON.stringify(citySearchHistory))
}

var memoryLoad = function () {
    citySeachHistory = JSON.parse(localStorage.getItem("citySearchHistory")) || [];
}

var getHistory = function (event) {
    var city = event.target.textContent
    document.querySelector("#city-search").value = city;
    console.log(city)
}
function myFunction() {
    let cityName = document.querySelector('#city-search').value;

    fetch(
        'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=a4dc6b4797cfe0a360daceabbd77f8dc')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

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
                // SET TO STORGE WITH cityName
                memorySet()
            }

            fetch('http://api.openweathermap.org/data/2.5/uvi?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&units=imperial&appid=a4dc6b4797cfe0a360daceabbd77f8dc'
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
                    //create HTML div to append new elements to render on page....
                    var newDiv = $('<div>');
                    newDiv.append(displayMainDate, tempEL, humEl, windEl, uvIndex);
                    $("#current-weather").html(newDiv);

                    function add() {
                        var element = document.createElement("li");
                        element.textContent = cityName;
                        element.setAttribute("value", cityName),
                            element.setAttribute("class", "list-group-item");
                        document.getElementById("search-history").appendChild(element);

                    }
                    add();

                    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=hourly,minutely,alerts&units=imperial&appid=a4dc6b4797cfe0a360daceabbd77f8dc'
                    )
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (fiveDayForecast) {
                            console.log(fiveDayForecast);
                            var forecastIcon = fiveDayForecast.daily[1].weather[0].icon
                            var url = "https://openweathermap.org/img/wn/" + forecastIcon + ".png"
                            document.getElementById("day-1").textContent = moment().add(1, "day").format("L");
                            document.getElementById("day-1-icon").setAttribute("src", url);
                            document.querySelector(".temp-1").textContent = fiveDayForecast.daily[1].temp.max;
                            document.querySelector(".hum-1").textContent = fiveDayForecast.daily[1].humidity;

                            var forecastIcon = fiveDayForecast.daily[2].weather[0].icon
                            var url = "https://openweathermap.org/img/wn/" + forecastIcon + ".png"
                            document.getElementById("day-2").textContent = moment().add(2, "day").format("L");
                            document.getElementById("day-2-icon").setAttribute("src", url);
                            document.querySelector(".temp-2").textContent = fiveDayForecast.daily[2].temp.max;
                            document.querySelector(".hum-2").textContent = fiveDayForecast.daily[2].humidity;

                            var forecastIcon = fiveDayForecast.daily[3].weather[0].icon
                            var url = "https://openweathermap.org/img/wn/" + forecastIcon + ".png"
                            document.getElementById("day-3").textContent = moment().add(3, "day").format("L");
                            document.getElementById("day-3-icon").setAttribute("src", url);
                            document.querySelector(".temp-3").textContent = fiveDayForecast.daily[3].temp.max;
                            document.querySelector(".hum-3").textContent = fiveDayForecast.daily[3].humidity;

                            var forecastIcon = fiveDayForecast.daily[4].weather[0].icon
                            var url = "https://openweathermap.org/img/wn/" + forecastIcon + ".png"
                            document.getElementById("day-4").textContent = moment().add(4, "day").format("L");
                            document.getElementById("day-4-icon").setAttribute("src", url);
                            document.querySelector(".temp-4").textContent = fiveDayForecast.daily[4].temp.max;
                            document.querySelector(".hum-4").textContent = fiveDayForecast.daily[4].humidity;

                            var forecastIcon = fiveDayForecast.daily[5].weather[0].icon
                            var url = "https://openweathermap.org/img/wn/" + forecastIcon + ".png"
                            document.getElementById("day-5").textContent = moment().add(5, "day").format("L");
                            document.getElementById("day-5-icon").setAttribute("src", url);
                            document.querySelector(".temp-5").textContent = fiveDayForecast.daily[5].temp.max;
                            document.querySelector(".hum-5").textContent = fiveDayForecast.daily[5].humidity;
                        })
                });

            document.querySelector("#search-history").addEventListener("click", getHistory);
        });
}


