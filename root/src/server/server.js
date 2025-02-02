// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

// PORT number
app.listen(9000, function () {
    console.log('Example app listening on port 9000!');
});

// GET route: root
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
    res.send(projectData);
});

// the data that will be posted
app.post('/add', (req, res) => {
    const {latitude, longitude, country, date,
        TripLength, countdown, weather, images} = req.body;
    projectData = {
        latitude,
        longitude,
        country,
        date,
        TripLength,
        countdown,
        weather,
        images,
    };
    res.send(projectData);
});

