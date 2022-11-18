//gathering elements from/for the DOM
const generator = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');
const date = new Date();
const currentDate = date.toDateString();

//components from OpenWeather
const apiKey = "&appid=132e833b1f1f64af7726f71a491fab3e&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

//generator function
generator.addEventListener("click", (e) => {
    e.preventDefault();
    const updatedURL = `${baseURL}${zip.value}${apiKey}`;
    console.log(updatedURL)
    fetchData(updatedURL).then((data) => {
        filter(data).then((filteredData) => {
            postData('/storedUserData',filteredData);
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
            console.log(data);
            return data;
        } else {
            alert("Error " + data.cod + ". " + capitalize(data.message) + ", please try again.");
        }
    } catch(err) {
        console.log(err);
    }
}

//function's name is self explanatory, but this bottlenecks the data; filters down what is needed for the server
const filter = async (data) => {
    try {
    const temperature = Math.floor(data.main.temp);
    const filteredData = {
        "date": currentDate,
        "temperature": temperature,
        "feelings": feelings.value
            };
        console.log(filteredData);
        return filteredData;
    } catch(err) {
        console.log(err);
    }
}

//"postData" async function similar to the one from the coursework
//this function will store/post the core data in the backend

const postData = async (url = "", data = {}) => {
    try{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredData)
    })
} catch(err) {
    console.log(err);
}
}