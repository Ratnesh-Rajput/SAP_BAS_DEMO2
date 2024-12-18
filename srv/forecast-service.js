const cds = require('@sap/cds'); // Corrected require statement
const axios = require('axios')


module.exports = cds.service.impl(async function() {
    const {ForecastData } = this.entities

    
    this.on('READ', 'ForecastData', async (req) => {
        let db=await cds.connect.to("db");
        const forecastData = await db.run('SELECT * FROM FORECAST_FORECASTDATA');
        return forecastData;
    })

    this.on('CREATE', 'ForecastData', async (req,res) => {
        let db= await cds.connect.to("db")
    
        const records = Array.isArray (req.data)? req.data: [req.data]
        console.log("records recieved",records);
        try{
            let response = await db.run(INSERT.into("FORECAST_FORECASTDATA").entries(records))

            return {"Status ": "201- created"}
            
        }
        
        catch(e) {
        
        console.log("error occured while saving the GL Records", e)
    
        return { "Status" : "500- server-error occured",e}
        }
    }
    )


    this.on('forecastData', async(req) => {


    //Dummy Data
      let forecastData = [ {'Date': '2025-01-01', 'Forecast': -13106940.69, 'Lower_CI': -14519746.62, 'Upper_CI': -11694134.76},
         {'Date': '2025-02-01', 'Forecast': -14018411.64, 'Lower_CI': -15434119.31, 'Upper_CI': -12602703.97}, 
         {'Date': '2025-03-01', 'Forecast': -15440492.67, 'Lower_CI': -16856264.64, 'Upper_CI': -14024720.71},
          {'Date': '2025-04-01', 'Forecast': -17327678.93, 'Lower_CI': -18743588.84, 'Upper_CI': -15911769.02},
           {'Date': '2025-05-01', 'Forecast': -19790233.83, 'Lower_CI': -21206261.99, 'Upper_CI': -18374205.67}, 
           {'Date': '2025-06-01', 'Forecast': -22995005.26, 'Lower_CI': -24411128.37, 'Upper_CI': -21578882.15},
            {'Date': '2025-07-01', 'Forecast': -26244916.94, 'Lower_CI': -27661115.65, 'Upper_CI': -24828718.23}, 
            {'Date': '2025-08-01', 'Forecast': -28887657.74, 'Lower_CI': -30303916.31, 'Upper_CI': -27471399.17}, 
            {'Date': '2025-09-01', 'Forecast': -33249309.33, 'Lower_CI': -34665614.95, 'Upper_CI': -31833003.72}, 
            {'Date': '2025-10-01', 'Forecast': -37258564.55, 'Lower_CI': -38674906.83, 'Upper_CI': -35842222.28}, 
            {'Date': '2025-11-01', 'Forecast': -42503460.85, 'Lower_CI': -43919832.77, 'Upper_CI': -41087088.93}, 
            {'Date': '2025-12-01', 'Forecast': -49834770.89, 'Lower_CI': -51251131.2, 'Upper_CI': -48418410.58},
             {'Date': '2026-01-01', 'Forecast': -14525221.82, 'Lower_CI': -16634740.72, 'Upper_CI': -12415702.92},
              {'Date': '2026-02-01', 'Forecast': -15541014.26, 'Lower_CI': -17652653.45, 'Upper_CI': -13429375.08},
               {'Date': '2026-03-01', 'Forecast': -17125912.1, 'Lower_CI': -19237655.92, 'Upper_CI': -15014168.28}, 
               {'Date': '2026-04-01', 'Forecast': -19228923.36, 'Lower_CI': -21340844.71, 'Upper_CI': -17117002.02}, 
               {'Date': '2026-05-01', 'Forecast': -21973158.58, 'Lower_CI': -24085229.53, 'Upper_CI': -19861087.64}, 
               {'Date': '2026-06-01', 'Forecast': -25544932.29, 'Lower_CI': -27657122.5, 'Upper_CI': -23432742.07},
                {'Date': '2026-07-01', 'Forecast': -29165384.09, 'Lower_CI': -31277668.33, 'Upper_CI': -27053099.86},
                 {'Date': '2026-08-01', 'Forecast': -32105645.34, 'Lower_CI': -34218002.88, 'Upper_CI': -29993287.8},
                  {'Date': '2026-09-01', 'Forecast': -36964243.41, 'Lower_CI': -39076657.12, 'Upper_CI': -34851829.69
                  }, {'Date': '2026-10-01', 'Forecast': -41427369.6, 'Lower_CI': -43539825.49, 'Upper_CI': -39314913.71},
                   {'Date': '2026-11-01', 'Forecast': -47273600.37, 'Lower_CI': -49386091.03, 'Upper_CI': -45161109.71}, 
                   {'Date': '2026-12-01', 'Forecast': -55510420.63, 'Lower_CI': -57622847.78, 'Upper_CI': -53397993.48}, 
                   {'Date': '2020-01-31', 'Forecast': -7679752.14, 'Lower_CI': 0.0, 'Upper_CI': 0.0}, {'Date': '2020-02-29', 'Forecast': -8294132.31, 'Lower_CI': 0.0, 'Upper_CI': 0.0}, {'Date': '2020-03-31', 'Forecast': -9123545.54, 'Lower_CI': 0.0, 'Upper_CI': 0.0}, {'Date': '2020-04-30', 'Forecast': -10218371.0, 'Lower_CI': 0.0, 'Upper_CI': 0.0}, {'Date': '2020-05-31', 'Forecast': -11648942.94, 'Lower_CI': 0.0, 'Upper_CI': 0.0}]

        //Step 1 : Make Axios call to python app 
       try {

        let responsedata = await axios.get("< endpoint of python app >")

       }catch(error) {
        console.log("error occured while calling the python ml app")
       }

        return forecastData || responsedata



    })

    // this.on("", async(req,res)=>{
    // let data = req.data    
    
        
    
    //     res.send();
    //     }
    // )
});