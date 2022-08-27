$(document).ready(function () {

  // Weather object 
  let weather = {
    
    // apikey 
    apiKey: "68047661532fdf7538611445f19846fa",

    // Get weather data
    fetchWeather: function (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data)).catch((error=> console.log("something went wrong")));
    },

    // Display weather data 
    displayWeather: function (data) {
      // destructuring weather data object  
      const { name } = data;
      const { description, icon } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { country } = data.sys;
      
      // Display data into document
      $(".city").text(name+ ", ");
      $(".country").text(country);
      $(".temp").html(parseFloat(Math.round(temp * 10) / 10)+ "°c&nbsp");
      $(".description").html(description);
      $(".icon").attr("src",`http://openweathermap.org/img/wn/${icon}.png`);
      $(".humidity").text("Humidity: "+humidity+"%");
      $(".wind").html("Wind: "+speed + " km/h");
      $(".weather").removeClass("loading");
      $("body").css("background-image",`url(https://source.unsplash.com/1600x900/?${name})` );
      
    },
    // Get city name 
    search:function(){
        this.fetchWeather($("#searchBar").val());
    }
  };
// Display weather on button click
  $("#searchbtn").click(function (e) { 
    e.preventDefault();
    weather.search()
    $("#searchBar").val("");
  });
  // Display weather on enter key   
  $("#searchBar").keyup(function (e) { 
    if(e == "enter"){
      weather.search()
    }
  });

  // Display default weather  
  weather.fetchWeather("goa")
});
