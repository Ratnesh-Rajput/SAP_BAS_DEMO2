sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/Router",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"

], (Controller, Router, JSONModel, MessageBox, MessageToast) => {
    "use strict";

    return Controller.extend("fiorifrontend.controller.View1", {


        //BEFORE THE RENDRING OF YOUR VIEW


        //VIEW : DASHBOARD

        onInit() {


            let oModel = new JSONModel({
                results: []
              });
              this.getView().setModel(oModel, "localModel");


              this.getStudentsData()


            //load the xlsx library

     $.getScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js").done(function(script, textStatus) {
         console.log("XLSX library loaded successfully");
        }).fail(function(jqxhr, settings, exception) {
                console.error("Failed to load XLSX library");
     });

        //CAP ODATA V2

        let that = this

        console.log(that)

        const Teachers = [
           { ID : 1, Name : "Shivam"},

           { ID : 2, Name : "SUMIT"},

           { ID : 3, Name : "SATYAM"},

           { ID : 4, Name : "fd"},
        ]

        const oModel1 = new JSONModel({

            Teachers : Teachers 

        })


        this.getView().setModel(oModel1)

    

        },



        handleroutingtoAnalyticalPage: function () {
            this.getRouter().navTo("RouteAnalyticalPage");
        },

        handleroutingtoDashboardPage: function () {
            this.getRouter().navTo("RouteDashboardPage");
        },

   
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },



        //---> it will make a call to our service (catelogservice ---> fetch the data of the student entity and will return it to the ui5 users)
        getStudentsData : function() {
 


          let CatelogServiceModel = this.getOwnerComponent().getModel("mainModel");

          // let BusinessServiceModel = this.getOwnerComponent().getModel("businessmodel");





          //cap -srv endpoint

          //HANA 
  


        },





        onUpload: function(e) {

          debugger


          //1. onupload is called ----------> (e) event

          //2. let file = e.getParameter("files")[0]

          //3. import(file)

            this._import(e.getParameter("files") && e.getParameter("files")[0]);


            var oModel = new JSONModel({
              "results": []
            });
            this.getView().setModel(oModel, "localModel");
          },

        _import: function(file) {


          //ui5

          //this it will not work inside the callback function 

          //this

          //let that = this



            var that = this;


            if (file && window.FileReader) {
              var reader = new FileReader();
              reader.onload = function(e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                  type: 'binary'
                });
                var excelData = [];
                workbook.SheetNames.forEach(function(sheetName) {
                  var sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                  excelData = excelData.concat(sheetData);
                });
                if (excelData.length > 0) {
                  var oModel = that.getView().getModel("localModel");
                  oModel.setData({
                    results: excelData
                  });

                  console.log("excelData>>>>>>>>>>>", excelData)


                  //JSON model
                  const oModel1 = new JSONModel({
                    excelData : excelData 
                })
  
                that.getView().setModel("excelData", oModel1)


                //IMPLEMENT BACKEND CALL

                if(excelData.length > 0) {
                  that.createRecords(excelData);
                }



        
               
            
                  MessageToast.show("Excel file uploaded successfully.");
                } else {
                  MessageToast.show("Uploaded Excel file is empty.");
                }
              };
              reader.onerror = function(ex) {
                console.error("Error occurred while reading the file:", ex);
              };
              reader.readAsBinaryString(file);
            } else {
              MessageToast.show("No file uploaded or FileReader not supported.");
            }
          },


          createRecords : function(excelData) {

            

            let OModel = this.getOwnerComponent().getModel("mainModel") //SRV --- CATELOGSERIVCE

            //GET


            //GET / POST

            //CONTEXT BINDING  ---> SINGLE GET/POST
            //LISTBINDING ------> ROWS (MUTIPLE RECORDS)

           OModel.bindList("/ForecastData").requestContexts(0,100).then(

             function(contexts) {

              let data = contexts.map(contexts => contexts.getObject());

              console.log("Data Received from General Ledger entity", data)

             },

             function(err) {

              console.log("error occured", err)

             }

            )



            //POST CALL


            // let excelData =  this.getView().getModel("excelData").getData()

            console.log("exceldata", excelData)


            debugger

            //extracted from excel  (8,300)
            // const generalLedgerData = [
            //   {
            //       companyCode: "COMP001", 
            //       glAccount: "GL12345",
            //       description: "Office Supplies Purchase",
            //       costCenter: "CC1001",
            //       profitCenter: "PC2001",
            //       location: "New York",
            //       amountGC: 1500.00,
            //       amountLC: 1200.00,
            //       date: "202412", // December 2024
            //       auditTrail: "Created by Admin on 2024-12-12"
            //   },
            //   {
            //       companyCode: "COMP002", 
            //       glAccount: "GL67890",
            //       description: "Sales Revenue",
            //       costCenter: "CC1002",
            //       profitCenter: "PC2002",
            //       location: "London",
            //       amountGC: 5000.00,
            //       amountLC: 4500.00,
            //       date: "202411", // November 2024
            //       auditTrail: "Created by User1 on 2024-11-30"
            //   }
            // ]



           

        //     //create model
        // let mainModel = this.getOwnerComponent().getModel("mainModel") //SRV --- CATELOGSERIVCE

        //    //create binding
        // let oListbinding = mainModel.bindList(
        //     "/GeneralLedger",
        //     null,
        //     null,
        //     null
        //    )



           //context 
        //   let oContext = oListbinding.create(excelData)

        //    oContext.created().then( 
        //      function() {
        //       let data = oContext.getObject()
        //      }
        //    ).catch( (err) => {

        //     console.log("error occured", err)
        //    })


          }
        

    });
});


//entity --> odata call
//actrion/functions --- ajax call