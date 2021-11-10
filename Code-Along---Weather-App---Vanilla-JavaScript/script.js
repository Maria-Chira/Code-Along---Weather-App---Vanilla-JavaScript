window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(
    ".temperature .degree-section span"
  );

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=094aaa60c3dfa148abee27885709bdd7`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const {temp} = data.main;
          console.log(data);
          const {description, main} =data.weather[0];
          
          //Set DOM Elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          console.log(data.name)
          locationTimezone.textContent = data.name;

          //Formula for Celsius
          let celsius = (temp - 32)* (5/9);

          //change temperature to Celsius/Farenheit
          temperatureSection.addEventListener('click', ()=>{
            if (temperatureSpan.textContent == "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temp;
            }
          })
          
        })
        .catch((err) => console.log("err ", err));
    });
  }
});
