console.log("Nothing");
const API_KEY = 'd1845658f92b31c64bd94f06f7188c9c';


function renderWeatherInfo(data){
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} *c`;
    // newPara.textContent = `Weather data:->22.43C`;

    document.body.appendChild(newPara);
}

async function fetchWeather() {
    try{
        let city="goa";

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

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