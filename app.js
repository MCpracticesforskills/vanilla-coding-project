function formatDate(timestamp) {
            let date=new Date(timestamp);
            let hours= date.getHours();
            if (hours<10) {
                hours=`0${hours}`;
            }
            let minutes= date.getMinutes();
            if (minutes<10) {
                minutes=`0${minutes}`;
            }
            
            let days=[
                "Sunday", 
            "Monday", 
            "Tuesday", 
            "Wednesday",
             "Thursday", 
             "Friday", 
             "Saturday", 
             "Sunday"
            ];
            let day= days[date.getDay()];
            return `${day} ${hours} : ${minutes}`;

        }

        function displayTemperature(response) {
                console.log(response.data);
            let temperatureElement= document.querySelector("#temperature");
            let dateElement=document.querySelector("#date");
            let cityElement=document.querySelector("#city");
            let descriptionElement=document.querySelector("#description");
            let windElement=document.querySelector("#wind");
            let humididtyElement=document.querySelector("#humidity");
            let iconElement=document.querySelector("#icon");
            
            celsiusTemperature=response.data.main.temp;
            
            temperatureElement.innerHTML=Math.round(celsiusTemperature);
            dateElement.innerHTML= formatDate(response.data.dt * 1000); 
            cityElement.innerHTML= response.data.name;
            descriptionElement.innerHTML = response.data.weather[0].description;
            windElement.innerHTML= Math.round(response.data.wind.speed);
            humididtyElement.innerHTML= response.data.main.humidity;
            iconElement.setAttribute(
                "src",
                `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            ); 

            iconElement.setAttribute(
                "alt", response.data.weather[0].description);

 }

 function search(city) {
     let apiKey = "453088d85d09cc5023dbd02542295ede";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
    }
 
 function handleSubmit(event) {
     event.preventDefault();
     let cityInputElement= document.querySelector("#city-input");
     search(cityInputElement.value); 
     
     }

function displayFahrenheitTemperature(event){
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
let fahrenheitTemperature=(celsiusTemperature* 9) / 5 + 32;
temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
}
     
 
        let celsiusTemperature=null;

        let form=document.querySelector("#search-form");
        form.addEventListener("submit", handleSubmit);

        let fahrenheitLink= document.querySelector("#fahrenheit-link");
         fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

         let celsiusLink = document.querySelector("#celsius-link");
            celsiusLink.addEventListener("click", displayCelsiusTemperature);

         search("Santa Fe");