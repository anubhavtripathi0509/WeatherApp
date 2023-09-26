const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// Initially variables
let currentTab = userTab;
const API_KEY = '3b8d19b0856d441db3195219232609';
currentTab.classList.add("current-tab")

// ek kaam aur pending hai


function renderWeatherInfo(data){
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.current?.temp_c.toFixed(2)} *c`;
    // newPara.textContent = `Weather data:->22.43C`;

    document.body.appendChild(newPara);
}

async function fetchWeather() {
    try{
        let city="goa";

        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);

        const data = await response.json();
        console.log("Weather data:->" , data); 

        renderWeatherInfo(data);
    }

    catch(err){
        let errPara = document.createElement('p');
        errPara.textContent = `Error Occured ${err}`;
        document.body.appendChild(errPara);
    }
    
}

async function getCustomWeatherDetails(){
    try{
        let latitude = 15.33333;
        let longitude = 18.3333;

        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}appid=${API_KEY}&units=metric`);
        const data = await result.json();

        console.log(data);
    }
    catch(err){
        let errPara = document.createElement('p');
        errPara.textContent = `Error Occured ${err}`;
        document.body.appendChild(errPara);
    }
}


function switchTab(clickedTab){
    apiErrorContainer.classList.remove("active");

    if(clickedTab !== currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("active");

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getFromSessionStorage();
        }
    }
}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("No geolocation Support")
    }
}

function showPosition(position){
    let lat = position.coords.latitude;
    let longi = position.coords.longitude;

    console.log(lat);
    console.log(longi);
}