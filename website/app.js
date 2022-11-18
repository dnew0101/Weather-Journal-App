//gathering elements from/for the DOM
const generator = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');
const entryHeader = document.querySelector('#entryHeader')
const dateDisplay = document.querySelector('#date');
const tempDisplay = document.querySelector('#temp');
const entryDisplay = document.querySelector('#entry');
const date = new Date();
const currentDate = date.toDateString();
const outputs = document.querySelector('#outputs');


//components from OpenWeather
const apiKey = "&appid=132e833b1f1f64af7726f71a491fab3e&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

//generator function
generator.addEventListener("click", (e) => {
    e.preventDefault();
    const updatedURL = `${baseURL}${zip.value}${apiKey}`;
    fetchData(updatedURL).then((data) => {
        filter(data).then((filteredData) => {
            postData("/store", filteredData).then(() => {
                getData("/all").then((response) =>{
                    update(response);
                });
            });
        });
    })
})

//stylistic decision for alert window
function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

//async-await function for retrieving data when url is fulfilled
const fetchData = async (url) => {
    try {
        const rawData = await fetch(url);
        const data = await rawData.json();
        if (data.cod == 200) {
            return data;
        } else {
            alert("Error " + data.cod + ". " + capitalize(data.message) + ", please try again.");
        }
    } catch(error) {
        console.log("Error",error);
    }
}

//function's name is self explanatory, but this bottlenecks the data; filters down what is needed for the server
const filter = async (data) => {
    try {
    const temperature = Math.round(data.main.temp);
    const filteredData = {
        "date": currentDate,
        "temperature": temperature,
        "feelings": feelings.value
            };
        return filteredData;
    } catch(error) {
        console.log("Error",error);
    }
}

//"postData" async function similar to the one from the coursework
//this function will store/post the core data in the backend
const postData = async (url = "", data = {}) => {
    try{
        const result = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
            return result;
    }catch(error) {
        console.log("Error",error);
    }
}

//retrieves data from backend
const getData = async (url) => {
    const data = await fetch(url);
    try {
        const response = await data.json();
        return response;
    } catch(error) {
        console.log("Error",error);
    }
}

//dynamically update UI with current info
const update = async (response) => {
    const allData = await response;
    if(allData.date) {
        if(!outputs.classList.contains('active-class')) {
            outputs.classList.add('active-class');
        }
        entryHeader.innerHTML = "<h2>Today's Journal Entry:<h2>"
        dateDisplay.innerHTML = allData.date;
        tempDisplay.innerHTML = allData.temperature + "°F";
        entryDisplay.innerHTML = allData.feelings;
    }
}