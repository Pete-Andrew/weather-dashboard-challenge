// get current time from moment
var time = moment();
// places the date in the main header 
$("#momentDate").text(time.format("dddd, Do, MMMM"));

// Add your own API key between the ""
var APIKey = "bd5a66ab99bbf1e26c28bc82ed4a9f87";

// Here we are building the URL we need to query the database

$("#search-button").on("click", function(event) {
  // takes information from the text box with id 'search-input'
  event.preventDefault();
 
  //sets a vat with the contents of the text entry box (e.g. a place name)
  var location = $("#search-input").val();

  //makes sure that data has been entered. ends the function if there is no data
  if (location === "") {
    console.log("nope");
    return 0;

  }
  
  //gets infomation for the location including lat and long which are needed for the 5 day forcast.
  var coordinateConverter =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    location +
    "&appid=" +
    APIKey;
  // console.log(coordinateConverter);

  $.ajax({
    url: coordinateConverter,
    method: "GET",
  }).then(function (fiveDayResponse) {
    console.log(fiveDayResponse);

    // creates lat and long vars from the response values from the coordinateConverter.
    var lat = fiveDayResponse[0].lat;
    var long = fiveDayResponse[0].lon;

    // uses lat and long to call a 5 day forcast from the API
    var fiveDayForcast =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=" +
      APIKey;
    //converts this data into an array using ajax
    $.ajax({
      url: fiveDayForcast,
      method: "GET",
    }).then(function (fiveDayForcastResponse) {
      console.log(fiveDayForcastResponse);

      //  creates several vars to log city,humitiy and temp data
      var city = fiveDayResponse[0].name;
      console.log(city);
      $("#city").text(city);

      var humidity = fiveDayForcastResponse.list[0].main.humidity;
      $("#humidity").text("Relative humidity: " + humidity + "%");
      console.log(humidity);

      var wind = fiveDayForcastResponse.list[0].wind.speed;
      $("#wind").text("Wind speed: " + wind + " m/s");

      //converts the kelvin to celcius
      var kelvinToCelciusConverter = 273.15;
      var KelvinTemp = fiveDayForcastResponse.list[0].main.temp;
      var celciusTemp = (KelvinTemp - kelvinToCelciusConverter).toFixed(2);
      $("#temp").text(celciusTemp + " ºC");
    });
  });

  var capitalButtonsDiv = document.getElementById("capitalsDiv");

  // creating button element
  var newButton = document.createElement("button");

  newButton.setAttribute("class", "btn btn-secondary btn-block");

  // creating text to be displayed on button
  var newButtonText = document.createTextNode(location);
  


  // appends text to button
  newButton.appendChild(newButtonText);

  // appending button to div
  capitalButtonsDiv.appendChild(newButton);


  // $('#newButton').addClass('btn btn-secondary btn-block');
});


  // var myDiv = document.getElementById("capitalsDiv");
                 
  //               // creating button element
  //               var button = document.createElement('BUTTON');
                 
  //               // creating text to be
  //               //displayed on button
  //               var text = document.createTextNode("Button");
                 
  //               // appending text to button
  //               button.appendChild(text);
                 
  //               // appending button to div
  //               myDiv.appendChild(button); ;

// var newButtonsDiv = $("capitalsDiv");
// document.createElement("button"); 
// var newButtonText = location;
// newButtonsDiv.appendChild("button");

// api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={}

// # Module 8 Server-Side APIs: Weather Dashboard

// ## Your Task

// Server APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

// Use the [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities. The link should take you to a guide on how to use the 5 Day Forecast API. You will need to register for an API key in order to use this API. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

// The base URL for your API calls should look like the following: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`.

// **Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

// You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).
 
// ## User Story

// ```text
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// ```

// ## Acceptance Criteria

// * Create a weather dashboard with form inputs.
//   * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
//   * When a user views the current weather conditions for that city they are presented with:
//     * The city name
//     * The date
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//     * The wind speed
//   * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
//     * The date
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//   * When a user click on a city in the search history they are again presented with current and future conditions for that city

//notes: http://osp123.github.io/tutorials/html/weatherAPI.html
//       https://openweathermap.org/weather-conditions