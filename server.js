let projectData = {};


//requiring express; creating server
const express = require('express');
const app = express();

const port = 8000; //just keeping it simple

//Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Initialize project folder
app.use(express.static('website'));

//listen method with arrow function
const server = app.listen(port, () => {
    console.log(`Server is listening on localhost: ${port}`);
});