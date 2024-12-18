// const axios = require('axios');

// async function getForecast(data) {
//     try {
//         const pythonAppUrl = "https://port8000-workspaces-ws-6gtwt.us10.trial.applicationstudio.cloud.sap/csrf-token"; // Python app CSRF endpoint
//         const sarimaUrl = "https://port8000-workspaces-ws-6gtwt.us10.trial.applicationstudio.cloud.sap/sarima"; // Python app SARIMA endpoint

//         // Step 1: Fetch the CSRF token
//         const csrfResponse = await axios.get(pythonAppUrl, {
//             headers: { "X-CSRF-Token": "Fetch" },
//         });

//         const csrfToken = csrfResponse.headers["x-csrf-token"];
//         if (!csrfToken) {
//             throw new Error("Failed to fetch CSRF token");
//         }

//         // Step 2: Make a POST request to the SARIMA endpoint with the CSRF token
//         const postResponse = await axios.post(
//             sarimaUrl,
//             data, // Pass the input data
//             {
//                 headers: {
//                     "X-CSRF-Token": csrfToken,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         return postResponse.data;
//     } catch (error) {
//         console.error("Error:", error.message);
//         throw error;
//     }
// }

// module.exports = { getForecast };




// Working Code for axios call
const axios = require('axios');

async function getForecast() {
    try {
        const pythonAppUrl = "http://localhost:8000/test"; // Python app URL

        // Step 1: Fetch the CSRF token
        const csrfResponse = await axios.get(pythonAppUrl, {
            headers: {
                "X-CSRF-Token": "Fetch",
            },
        });

        const csrfToken = csrfResponse.headers["x-csrf-token"];
        if (!csrfToken) {
            throw new Error("Failed to fetch CSRF token");
        }

        // Step 2: Use the token in a subsequent request
        const postResponse = await axios.post(
            pythonAppUrl,
            { data: "Your data here" }, // Body data
            {
                headers: {
                    "X-CSRF-Token": csrfToken,
                    "Content-Type": "application/json",
                },
            }
        );

        return postResponse.data;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

module.exports = { getForecast };





// const axios = require('axios');

// async function getForecast(dataToSend) {
//     try {
//         const pythonAppUrlTest = "https://port8000-workspaces-ws-6gtwt.us10.trial.applicationstudio.cloud.sap/test"; // Python /test endpoint
//         const pythonAppUrlSarima = "https://port8000-workspaces-ws-6gtwt.us10.trial.applicationstudio.cloud.sap/sarima"; // Python /sarima endpoint

//         // Step 1: Fetch the CSRF token from /test endpoint
//         const csrfResponse = await axios.get(pythonAppUrlTest, {
//             headers: {
//                 "X-CSRF-Token": "Fetch",
//             },
//         });

//         const csrfToken = csrfResponse.headers["x-csrf-token"];
//         if (!csrfToken) {
//             throw new Error("Failed to fetch CSRF token");
//         }

//         // Step 2: Use the token in a subsequent POST request to /sarima endpoint
//         const postResponse = await axios.post(
//             pythonAppUrlSarima,
//             dataToSend, // JSON body data
//             {
//                 headers: {
//                     "X-CSRF-Token": csrfToken,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         return postResponse.data;
//     } catch (error) {
//         console.error("Error in getForecast:", error.message);
//         throw error;
//     }
// }

// module.exports = { getForecast };