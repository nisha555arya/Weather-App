// console.log("hiiii");
const wrapper = document.querySelector(".wrapper"),
inputPart =  wrapper.querySelector(".input-part"),
infoText = inputPart.querySelector(".info-text"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
arrowBack = wrapper.querySelector("header i");
// wIcon = document.querySelector(".weather-part");

inputField.addEventListener("keyup", e=>{
   
     if(e.key =="Enter" && inputField !=""){
      requestApi(inputField.value);

    }
});

locationBtn.addEventListener("click" ,()=>{
    if(navigator.geolocation){
// if browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess , onError);
    }else{
        alert(" Your browser not support geolocation api");
    }
});

function onSuccess(position){
    const {latitude, longitude} =position.coords;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4f23f30df77911a240c5928845f56208`;
    infoText.innerHTML =  "Getting weather deatils";
    infoText.classList.add("pending");
    fetch(api).then(response =>response.json()).then(result => weatherDetails(result));
}
function onError(error){
    infoText.innerHTML = error.message;
infoText.classList.add("error");
}



async function requestApi(city){
let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4f23f30df77911a240c5928845f56208`;
infoText.innerHTML =  "Getting weather deatils";
infoText.classList.add("pending");
const res=await fetch(api);
const data=await res.json();
console.log(data);
weatherDetails(data);
// try{
//     const res=await fetch(api);
// const data=await res.json();
// if(data.cod == "404"){
//     throw (data);
// }
// }catch(err){
//     console.log(err);
//     infoText.classList.replace("pending" , "error");
//     infoText.innerText =err.message;
// }
// fetch(api).then(response =>response.json()).then(result => weatherDetails(result));
}

// function weatherDetails(info){
//     console.log(info);
// }


function weatherDetails(info){
    infoText.classList.replace("pending" , "error");
    if(info.cod == "404"){
        infoText.innerText = `${inputField.value} isn't a vaild city name`;
    }
    else{
        infoText.classList.remove("pending" , "error");
        wrapper.classList.add("active");
        document.querySelector(".weather-part").innerHTML=`<img src=${generatingImages(info.weather[0].id)} alt="">
        <div class="temp">
            <span class="numb">13</span>
            <span class="deg">&deg;</span>C
        </div>
        <div class="weather">${info.weather[0].main}</div>
        <div class="location">
            <i class="bx bx-map"></i>
            <span>${info.name}</span>
        </div>
        <div class="bottom-details">
            <div class="column-feels">
                <i class="bx bxs-thermometer"></i>
                <div class="details">
                    <div class="temp">
                        <span class="numb-2">${info.main.temp}</span>
                        <span class="deg">&deg;</span>C
                    </div>
                    <p>Feels like</p>
                </div>
            </div>
            <div class="column humidity">
                <i class="bx bxs-droplet-half"></i>
                <div class="details">
                        <span>${info.wind.speed}</span>
                    <p>Humidity like</p>
                </div>
            </div>
        </div>`;

    }
     

}


function generatingImages(id){
    if( id ==800){
      return "images/clear.svg";
    }
     else if( id >=200 && id <= 232){
        return "images/strom.svg";
      } else if( id >=600 && id <= 700){
        return "images/snow.svg";
      } else if( id >=701 && id <= 781){
        return "images/haze.svg";
      } else if( id >=782 && id <= 881){
        return "images/clouds.svg";
      } else if( (id >=300 && id <= 321) || (id>=500 && id<=531)){
        return "images/rain.svg";
      }
}

arrowBack.addEventListener("click" ,()=>{
    wrapper.classList.remove("active");

});