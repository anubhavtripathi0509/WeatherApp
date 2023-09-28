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
oldTab.classList.add("current-tab")

// ek kaam aur pending hai






function switchTab(newTab){
    // apiErrorContainer.classList.remove("active");

    if(newTab !== oldTab){
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

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

userTab.addEventListener("click", ()=>{
    // pass clicked tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener("click", ()=>{
    // pass clicked tab as input parameter
    switchTab(searchTab);
});

// check if cordinates are already present in session storage
function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        // agar local coordinates nhi mile
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}


// function renderWeatherInfo(data){
//     let newPara = document.createElement('p');
//     newPara.textContent = `${data?.current?.temp_c.toFixed(2)} *c`;
//     // newPara.textContent = `Weather data:->22.43C`;

//     document.body.appendChild(newPara);
// }

async function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    // fetch values from weather info object and put it in UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src =`https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`
    temp.innerText = weatherInfo?.main?.temp;
    windspeed.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    cloudiness.innerText = weatherInfo?.clouds?.all;


    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);

        const data = await response.json();
        console.log("Weather data:->" , data); 

        // renderWeatherInfo(data);
    }

    catch(err){
        let errPara = document.createElement('p');
        errPara.textContent = `Error Occured ${err}`;
        document.body.appendChild(errPara);
    }
    
}

async function fetchUserWeatherInfo(coordinates){

    const {lat, lon} = coordinates;
        // make grantlocation invisible
        grantAccessContainer.classList.remove("active");
        // make loader visible
        loadingScreen.classList.add("active");

    // API CALL
    try{
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}appid=${API_KEY}&units=metric`);
        const data = await result.json();
        console.log(data);
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data)
    }
    catch(err){
        loadingScreen.classList.remove("active")
        let errPara = document.createElement('p');
        errPara.textContent = `Error Occured ${err}`;
        document.body.appendChild(errPara);
    }
}



function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("No geolocation Support");
    }
}

function showPosition(position){
    const userCoordinates = {
    lat : position.coords.latitude,
    longi : position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}


const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let cityName = searchInput.ariaValueMax;

    if(cityName == "")
        return;
    else
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response=await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
    }
    catch(err){
        loadingScreen.classList.remove("active")
        let errPara = document.createElement('p');
        errPara.textContent = `Error Occured ${err}`;
        document.body.appendChild(errPara);
    }
}