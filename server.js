projectData = {};     // app API endpoint 

// Require Express to run server and routes
const express =require('express');
// http optional 

// Start up an instance of app
const app = express();

/* Dependencies   this is called as bodyparser to use it as the middle-ware to handle a POST request   */

const bodyParser = require('body-parser'); // parse the data there are options for parsing


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false })); // parsing the URL-encoded data with the querystring library false
app.use(bodyParser.json()); // parse with json

// Cors for cross origin allowance

const cors =require('cors');
app.use(cors());
// CORS defines a way for client web applications that are loaded in one domain to interact with resources in a different domain.

// Initialize the main project folder
app.use(express.static('website')); // for connecting the server side with the client side


// Setup Server
/* I've created the port and give it the value 3000 and the hostname code and it is located in node.js site   */

const port = 3000;
const hostname ='127.0.0.1';

// creating the server   i've got the code from node.js site 

const server = app.listen(port , hostname,() =>{
    console.log(server);
    console.log(`Server running at http://${hostname}:${port}/`);
});
  
 // i've used the object method in get and post requist because of the projectdata is an abject method too .  

/* I've created app get to this server to get the requist from the client side 
and depending on that requist so the server will be giving the client all the data that the server have got it
*/

app.get ('/all' , sendData);
 // i've created that function to send all the data that stored in the server to the projectdata depending on the requist from the app and updateui
function sendData(req , res) {
    res.send(projectData);
 
}

// i've created the app post to send the coming  data from the client side to the server to store it in projectdata
app.post('/add', newData);
// i've created that function to collect all the data that i've got and sending  it to the projectdata 
function newData (req , res){
projectData = req.body ;
res.send(projectData);
}

