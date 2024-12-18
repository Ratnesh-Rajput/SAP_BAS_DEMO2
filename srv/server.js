const cds= require("@sap/cds")
const express= require("express");
// const odatav2proxy= require("@cap-js-community/odata-v2-adapter")
const   cors=require("cors")
const bodyparser = require("body-parser");  
const axios = require("axios")
const {getForecast}=require("./getForecast")
cds.on("bootstrap",(app)=>{
    app.use(cors());
    // app.use(odatav2proxy());
    app.use(bodyparser.json());

    app.get('/getdata', (req, res) => { res.send('Data retrieved successfully'); })

    
    app.get('/getForecastPrediction', async (req, res) => {
        try {
            // Here you would perform your business logic or call a service
            // that fetches or computes the forecast data.

            // Dummy forecast data for demonstration
            let response=await getForecast()
            console.log(response);
            // const forecast= response;
            const forecastData = response;

            // Send the data back in the response
            res.json(forecastData);
        } catch (error) {
            console.error('Error fetching forecast data:', error);
            res.status(500).send('An error occurred while processing the forecast data.');
        }
        // try {
        //     // Axios call to the Python app's endpoint
        //     const pythonAppUrl = ""; // Replace with your Python app's endpoint
        //     const response = await axios.get(pythonAppUrl);

        //     // Extract data from the Python app response
        //     const forecastData = response.data;

        //     // Send the received data back in the response
        //     res.json(forecastData);
        // } catch (error) {
        //     console.error('Error fetching forecast data from Python app:', error.message);
        //     res.status(500).send('An error occurred while fetching forecast data.');
        // }
    
    })


}) 

module.exports = cds.server;