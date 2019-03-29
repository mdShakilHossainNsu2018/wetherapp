window.addEventListener('load',()=>{
   let long;
   let lat;
   let temperatureDegree = document.querySelector(".temperature-degree");
   let locationTimezone = document.querySelector(".location-timezone");
   let temperatureDescription = document.querySelector(".temperature-description");
   let temperatureSection = document.querySelector(".temperature");
   let temperatureSpan = document.querySelector(".temperature span");


   if (navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position => {
          long = position.coords.longitude;
          lat = position.coords.latitude;
          const proxy = "https://cors-anywhere.herokuapp.com/";
          const api = `${proxy}https://api.darksky.net/forecast/c157055d6b96620d0b9ae1c7156d4caa/${lat},${long}`;
          fetch(api)
              .then(response =>{
                  return response.json();
              })
              .then(data => {
                  console.log(data);
                  const {temperature,summary, icon} = data.currently;
                  temperatureDegree.textContent = temperature;
                  temperatureDescription.textContent = summary;
                  locationTimezone.textContent = data.timezone;
                  const celsius = (temperature-32) *5/9;
                  setIcon(icon, document.getElementById("icon1"));

                  temperatureSection.addEventListener("click", () => {
                      if (temperatureSpan.textContent === "F"){
                          temperatureSpan.textContent = "C";
                          temperatureDegree.textContent = Math.floor(celsius);
                      }else {
                          temperatureSpan.textContent = "F";
                          temperatureDegree.textContent = temperature;
                      }
                  })
              })
       });
   }
   function setIcon(icon, iconId) {
       const skycons = new Skycons({color: "white"});
       const currentIcon = icon.replace(/-/g, "_").toUpperCase();
       skycons.play();
       return skycons.set(iconId, Skycons[currentIcon]);
   }
});