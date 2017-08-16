window.onload = init;

function init() {
  getLocation();
}

function getLocation() {
  //check if geolocation is enabled
  if (navigator.geolocation) {
    //if it is, get current location and the weather
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    //otherwise show an error message
    document.getElementById("location").innerHTML =
      "Geolocation is not supported by this browser.";
  }
}

function getWeather(position) {
  // get coordinates
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  //variable for the open weather api
  var weatherURL =
    "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&APPID=d12af84073ba132cf09515fba30ccdc8";

  //function to get the weather from the api
  $.getJSON(weatherURL).done(function(data) {
    //save temperature in a variable
    var kelvin = data.main.temp;

    //convert temperature from kelvin to fahrenheit
    convertFarFromKel(kelvin);
    
    //save city name in a variable
    var city = data.name;
    
    //display the city name
    document.getElementById("location").innerHTML = city;
    
    //save weather description in a variable
    var description = data.weather[0].description;
    
    //display the description
    document.getElementById("description").innerHTML = data.weather[0].description;
    
    //save the icon code in a variable
    var icon = data.weather[0].icon;

    //get the url for the icon from the api
    var iconURL = "https://openweathermap.org/img/w/" + icon + ".png";

    //add the icon image to a div
    document.getElementById("icon").innerHTML = "<img id='curIcon'src='" + iconURL + "'>";

    //give it a title attribute so it displays a description on mouse hover
    document.getElementById("icon").setAttribute("title", data.weather[0].main);

    //call function to change the background image
    backgroundImage(data.weather[0].main);
  });
}

//function to convert temperature from kelvin to fahrenheit
function convertFarFromKel(temp) {
  //do the formula
  var far = Math.round(temp * 9 / 5 - 459.67);

  //display the temperature in a div
  document.getElementById("cur").innerHTML = far + "° F";

  //function call to convert to celsius on button click
  document.getElementById("celsius").onclick = function() {
    convertCel(far);
  };
}

//function to convert temperature from celsius to fahrenheit
function convertFar(temp) {
  //do the formula
  var far = Math.round(temp * 9 / 5 + 32);

  //display the temperature in a div
  document.getElementById("cur").innerHTML = far + "° F";

  //function call to convert temperature from fahrenheit to celsius
  document.getElementById("celsius").onclick = function() {
    convertCel(far);
  };
}

//function to convert temperature from fahrenheit to celsius
function convertCel(temp) {
  //do the formula
  var cel = Math.round((temp - 32) * 5 / 9);

  //display temperature in a div
  document.getElementById("cur").innerHTML = cel + "° C";

  //function call to convert temperature from celsius to fahrenheit on button click
  document.getElementById("fahrenheit").onclick = function() {
    convertFar(cel);
  };
}

//function to change background image based on weather description
function backgroundImage(curWeather) {
  //convert to lower case
  curWeather = curWeather.toLowerCase();

  //empty varaible to hold the image url
  var url = "";

  //if weather description contains "clouds", set the background image
  if (curWeather.indexOf("clouds") != -1) {
    //url = "https://tctechcrunch2011.files.wordpress.com/2015/08/clouds.jpg";
    url = "https://i.ytimg.com/vi/z2UDZMu2GLU/maxresdefault.jpg";
  } 
  //if the description contains "thunderstorm", set the image
  else if (curWeather.indexOf("thunderstorm") != -1) {
    url = "http://az616578.vo.msecnd.net/files/2016/05/28/636000076698153744-318535480_maxresdefault.jpg";
  } 
  //if it contains "rain", set the image
  else if (curWeather.indexOf("rain") != -1) {
    url =
      "http://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/142/2016/01/06122148/rain-wet-storm-clouds-rainfall.jpg";
  } 
  //if it contains "drizzle", set the image
  else if(curWeather.indexOf("drizzle") != -1){
    url = "https://i.ytimg.com/vi/erIwVs5OuS8/maxresdefault.jpg";
  } 
  //if it contains "clear sky", set the image
  else if (curWeather.indexOf("clear sky") != -1 || curWeather.indexOf("clear") != -1) {
    url = "http://img.mota.ru/upload/wallpapers/2010/05/14/08/01/22099/mota_ru_0051405-2560x1600.jpg";
  } 
  //if it contains "snow", set the image
  else if (curWeather.indexOf("snow") != -1) {
    url =
      "https://media.idownloadblog.com/wp-content/uploads/2016/01/bokeh-snow-flare-water-white-splash-pattern-9-wallpaper.jpg";
  } 
  //if it contains "sleet", set the image
  else if(curWeather.indexOf("sleet") != -1){
    url = "https://c1.staticflickr.com/4/3036/3024541738_8017299b6c_b.jpg";
  } 
  //if it contains "mist", "fog", or "haze", set the image
  else if(curWeather.indexOf("mist") != -1 || curWeather.indexOf("fog") != -1 || curWeather.indexOf("haze") != -1){
    url = "https://www.happywall.se/uploads/galleri/1047/forest_fog_gallery.jpg";
  }

  //set the url to the background image
  $("#container").css("background-image", "url(" + url + ")");
}
