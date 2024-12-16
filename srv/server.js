const cds= require("@sap/cds")
const express= require("express");
// const odatav2proxy= require("@cap-js-community/odata-v2-adapter")
const   cors=require("cors")
const bodyparser = require("body-parser");  

cds.on("bootstrap",(app)=>{
    app.use(cors());
    // app.use(odatav2proxy());
    app.use(bodyparser.json());

    app.get('/getdata', (req, res) => { res.send('Data retrieved successfully'); })
}) 

module.exports = cds.server;