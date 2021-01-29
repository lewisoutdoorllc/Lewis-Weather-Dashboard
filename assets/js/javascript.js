    function myFunction() {
    var cityName = document.querySelector('#city-search').value;
    
    fetch(
        'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=a4dc6b4797cfe0a360daceabbd77f8dc'
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

   
    });
}
