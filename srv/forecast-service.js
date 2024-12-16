const cds = require('@sap/cds'); // Corrected require statement

module.exports = cds.service.impl(async function() {
    const {ForecastData } = this.entities

    
    this.on('READ', 'ForecastData', async (req) => {
        let db=await cds.connect.to("db");
        const forecastData = await db.run('SELECT * FROM MY_DATA_FORECASTDATA');
        return forecastData;
    })

    // this.on('CREATE', 'ForecastData', async (req) => {
    //     // let db=await cds.connect.to("db");
    //     // // const forecastData = await db.run('INSERT ');
    //     // return forecastData;
    // })

    // this.on("", async(req,res)=>{
    // let data = req.data    
    
        
    
    //     res.send();
    //     }
    // )
});