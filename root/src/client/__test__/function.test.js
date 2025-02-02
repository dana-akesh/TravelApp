require('jest-fetch-mock').enableMocks();// for the client test
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let app;
let projectData = {};
// before the test set up the server
beforeAll(() => {
    app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.static('dist'));

    app.get('/all', (req, res) => {
        res.send(projectData);
    });

    app.post('/add', (req, res) => {
        const { latitude, longitude, country, date, TripLength, countdown, weather, images } = req.body;
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
});
// the test of the server
describe('Server', () => {
    it('should return empty projectData on GET => /all', async () => { // verify that the get req all will return empty
        const response = await request(app).get('/all');
        expect(response.statusCode).toBe(200);// if the http statues ==200 that means it is successful
        expect(response.body).toEqual({});// checks if it is empty
    });

    it('should store and return projectData on POST => /add', async () => {
        const data = {
            // dummy datta
            latitude: 40.7128,
            longitude: -74.0060,
            country: 'USA',
            date: '2024-09-01',
            TripLength: 5,
            countdown: 10,
            weather: 'cloudy',
            images: ['image1.jpg', 'image2.jpg'],
        };

        const postResponse = await request(app).post('/add').send(data);
        expect(postResponse.statusCode).toBe(200);// success
        expect(postResponse.body).toEqual(data);// it has to equla the data

        const getResponse = await request(app).get('/all');
        expect(getResponse.body).toEqual(data);
    });
});
//*************************Client test****************************

document.getElementById = jest.fn((id) => {// get the ids
    if (id === 'city') return { value: 'italy' };
    if (id === 'dateOfTrip') return { value: '' }; // No trip date provided
    if (id === 'endDate') return { value: '' }; // No end date provided
    //this case should return error
});

// Import the performAction function from the js/app
import { performAction } from '../js/app';

describe('client', () => {
    beforeEach(() => {// before each test
        jest.clearAllMocks(); // Clear mock data
        fetch.resetMocks(); // Reset mock fetch
    });

    it('it should give an alert that the dates are not entered', async () => {
        // Mock the global alert function
        global.alert = jest.fn();

        await performAction(); // Call the function

        expect(global.alert).toHaveBeenCalledWith('Please select the date of trip!');// check if it alerts when the date is not entered is correct
    });
});


