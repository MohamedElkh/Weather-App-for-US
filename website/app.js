// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Global Variables */
// i've used queryselector to identify the id of the elements 
const zipCode =document.querySelector('#zip');
const feeling =document.querySelector('#feelings');
const tempreture=document.querySelector('#temp');
const content =document.querySelector('#content');
const date =document.querySelector('#date');

const apiKey ='&appid=dea99e2c7803acdabdfa201269a2a121&units=imperial';  //i've added &units=metric For temperature in Celsius use units=metric

// function addeventlistener to generate my function that i've added inside it 
// the function contains (one) - the url of openweathermap with the postal code of the state that i wanted to get the temperature in it right now
// my private apikey to make the site allowed to me to get the data from it.
// (two) - i used the function getweathercondition so by this function i will get the data that i wanted it
// (three) - i used postdata function to send the info that i get it by function getweathercondition to send it  to post data in the server.js

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){

    let baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}${apiKey}`;
    
console.log(zipCode.value);
// I used console.log on the browser to see the data
getWeatherCondition(baseURL,apiKey,zipCode.value)   // function to get the temperature from openweathermap

.then((data)=>{
  console.log(data);
  // add function postdata to send the data from the client side to the server side server.js
  postData('/add' , {date:newDate , temp:data.main.temp, content : feeling.value})
 
}).then( ()=>updateUI())  // I've used function updateui to update and display the info on the browser

}


// getting data from api 

// function to get the tempreture data  from the open weather map
const getWeatherCondition = async (baseURL,apiKey,zipCode)=>{

  const res = await fetch(baseURL+apiKey+zipCode.value)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}


// function postdata to send the data from the client side to the server side to project data end point by json method 
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',  // a browser security feature that restricts how documents and scripts on one origin can interact with resources
      headers: {
          'Content-Type': 'application/json',
      },
           
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }}


// getting the data from the server  and applying it to the browser  
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = `Date : ${allData.date}`;
    document.getElementById('temp').innerHTML = `Tempreture :${allData.temp}`;
    document.getElementById('content').innerHTML = `Feeling :${allData.content}`;
    

  }catch(error){
    console.log("error", error);
  }
}
