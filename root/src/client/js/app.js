export async function performAction(e) {
    const city = document.getElementById('city').value;
    const tripDate = document.getElementById('dateOfTrip').value;
    const endDate = document.getElementById('endDate').value;


// check if the trip start date and the trip end date are null then send and alert
    if (!tripDate && !endDate) {
        alert("Please select the date of trip!");
        return;
    }

    // Calculate the trip duration and the countdown.
    // get a localized date string with the current date.
    const date = new Date().toLocaleDateString();

    // current time and date
    const currentDate = new Date();

    // convert the trip date and end date to date objects
    // the trip date object
    const tripDateObj = new Date(tripDate);
    // end of trip date
    const endDateObj = new Date(endDate);

    // calculate the number of days from the date of booking till the start of the trip
    const countdown = Math.ceil((tripDateObj - currentDate) / (1000 * 60 * 60 * 24));
    const timeDifference = endDateObj.getTime() - tripDateObj.getTime();
    const TripLength = Math.ceil(timeDifference / (1000 * 3600 * 24));

    try {
        // Fetch location data, and images data in parallel to make it preform faster the weather data wasnt added
        // bc it has to hav the lng and lat.(couldnt figure out how to make it possible)
        // promise.all executes two asynchronous functions in parallel
        const [locationData, imageData] = await Promise.all([
            getAppData(city),
            getImagesData(city)
        ]);

        // if the location data is not null , destructure the location data
        if (locationData) {
            const {lat: latitude, lng: longitude, countryName: country} = locationData;

            // now bc we have the lan and lng we will fetch the weather data and wait for it to be returned
            const weatherData = await getWeatherData(latitude, longitude);

            // if it is not null then find the weather when  it is the trip date
            if (weatherData) {
                const weatherForTrip = weatherData.data.find(day => day.datetime === tripDate);

                // on the date of the trip(post these datas to post)
                if (weatherForTrip) {
                    const DataPost = {
                        latitude, longitude, country, countdown, date, TripLength, tripDate, weather: {
                            description: weatherForTrip.weather.description,
                            temp: weatherForTrip.temp,
                            high_temp: weatherForTrip.high_temp,
                            low_temp: weatherForTrip.low_temp
                        }, images: imageData// Ensure images are included
                    };

                    await postData('/add', DataPost);// post method
                    await updateUI();// update the ui to show the data that was posted
                } else {
                    alert('There is no weather information available for the chosen travel date.');
                }
            } else {
                // if the weather data is null
                alert('Failed to fetch weather data!');
            }
        } else {
            // if the location data is null
            alert('No data found. Please try another city.');
        }
    } catch (error) {
        console.error('Error', error);
    }
}

/*to fetch city data from GeoNames API */
export const getAppData = async (city) => {

    // credintials for the geonames api
    const geonamesUsername = 'danaak';
    const baseURL = 'http://api.geonames.org/searchJSON?';//url
    const queryParams = `q=${city}&maxRows=1&username=${geonamesUsername}`;

    // send a get req to the url
    const response = await fetch(baseURL + queryParams);
    try {
        if (!response.ok) {// if the res is not okay then throw error
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.geonames && data.geonames.length > 0) { // if not null
            return data.geonames[0]; // Return the first result it found
        } else {
            console.error('No data found for the city.'); //else error
            return null;
        }
    } catch (error) {
        console.log('Error', error);
    }
};

// Weatherbit API
export const getWeatherData = async (lat, lon) => {
    //url construction
    const apiKey = '58b51563876c48e8ba2c77c7c11600dc'; // API KEY
    const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily';// url
    const queryParams = `?lat=${lat}&lon=${lon}&key=${apiKey}`;

    try {
        const response = await fetch(baseURL + queryParams);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error', error);
    }
};

// Pixabay API
export const getImagesData = async (city) => {
    //const apiKey = process.env.PIXABAY_API_KEY;
    const apiKey = '48600013-d49c966ea3d58746d45cde058';
    //console.log(apiKey);
    const baseURL = 'https://pixabay.com/api/';
    const queryParams = `?key=${apiKey}&q=${encodeURIComponent(city)}&image_type=photo&per_page=3`;

    // GET Request to the Pixabay API
    try {
        const response = await fetch(baseURL + queryParams);

        if (!response.ok) {// if the res is not okay then throw error
            throw new Error('Failed to fetch images data');
        }

        // wait the res and then convert it to json format
        const data = await response.json();

        // Map to URLs only for it to work
        return data.hits.map(img => img.largeImageURL);
    } catch (error) {
        console.error('Error', error);
    }
};

/*POST data to the server */
export const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',// method
        credentials: 'same-origin', headers: {
            'Content-Type': 'application/json',// type
        }, body: JSON.stringify(data),// convert to json format
    });

    try {
        const newData = await response.json();// wait res and then convert
        console.log('Posted successfully:', newData);// debug
        return newData;
    } catch (error) {
        console.log('Error occurred while posting data:', error);// debug
    }
};

/* Function to retrieve data from the server */
const retrieveData = async () => {
    const request = await fetch('/all');// get req to this endpoint

    try {
        const allData = await request.json();// response convert to json

        // Update DOM elements with the retrieved data
        // if the latitude anf longitude need to be printed
        document.getElementById('country').innerHTML = allData.country ? `Country: ${allData.country}` : 'No country data';
        document.getElementById('date').innerHTML = `Submission date: ${allData.date}` || 'No date available';
        document.getElementById('countdown').innerHTML = allData.countdown !== undefined ? `Days until trip: ${allData.countdown}` : 'No trip date set';

        // Display weather
        if (allData.weather) {
            document.getElementById('weather').innerHTML = `
                Weather on Trip Date: ${allData.weather.description}
                Temp: ${allData.weather.temp}°C 
                High: ${allData.weather.high_temp}°C 
                Low: ${allData.weather.low_temp}°C
            `;
        } else {
            document.getElementById('weather').innerHTML = 'No weather data available';
        }

        // Display images
        if (allData.images && allData.images.length > 0) {// if the img is available
            const imageContainer = document.getElementById('images');// get the div id
            imageContainer.innerHTML = `<h3 style="margin: 10px 0">Images:</h3>`;// use the inner html and post the data

            imageContainer.innerHTML += allData.images.map(url => `<img src="${url}" alt="Travel Image" style="  width: 30%; height:200px; margin: 5px;">`).join('');
        } else {
            document.getElementById('images').innerHTML = 'No images available';// it teh img is not available
        }
        document.getElementById('TripLength').innerHTML = allData.TripLength ? `Trip length: ${allData.TripLength} days` : 'No trip length data available';//post the trip length


    } catch (error) {//error when retrieving the data
        console.log('Error', error);
    }
};

// UI updated using data in server
const updateUI = async () => {
    try {
        await retrieveData();
    } catch (error) {
        console.error('Error updating UI:', error);
    }
};
