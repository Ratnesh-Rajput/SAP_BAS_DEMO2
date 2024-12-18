sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/routing/Router",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",
  "sap/m/MessageToast",
  'sap/viz/ui5/data/FlattenedDataset',
  'sap/viz/ui5/format/ChartFormatter',
  'sap/viz/ui5/api/env/Format',
  'sap/ui/model/BindingMode',
  "sap/suite/ui/microchart/InteractiveLineChart",
  "sap/suite/ui/microchart/InteractiveLineChartPoint"


], (Controller, Router, JSONModel, MessageBox, MessageToast, FlattenedDataset, ChartFormatter, Format, BindingMode, InteractiveLineChart, InteractiveLineChartPoint) => {
  "use strict";

  return Controller.extend("fiorifrontend.controller.View1", {




    onInit: function () {


      $.getScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js").done(function (script, textStatus) { console.log("XLSX library loaded successfully"); }).fail(function (jqxhr, settings, exception) { console.error("Failed to load XLSX library"); });
      // Dummy data for the chart, mapped to the schema

      //Initialize the empty ForcastModel onit
      var oForecastModel = new JSONModel();
      this.getView().setModel(oForecastModel, "forecastModel");




    },


    onGetForecastData: function () {
      let ForecastDataModel = this.getOwnerComponent().getModel("mainModel");

      let that = this
      let forcastTable = this.getView().byId("forecastTable")

      $.ajax({
        url: "/getForecastPrediction",  
        method: "GET",  
        success: function (response) {
           
            if (response) {


              let ForcastModel = new JSONModel();
                
              // Assuming the response contains the forecast data, set it to the model
              ForcastModel.setData({ ForecastData: response });

              // Set this model to the view
              that.getView().setModel(ForcastModel, "forecastModel");
              


              //Set the Chart
              that._updateChartWithForecastData();

            } else {
                console.error("No forecast data received.");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error occurred while calling the getForecastPrediction endpoint: ", textStatus, errorThrown);
        }
    });



    forcastTable.setVisible(true)





      // var oChart = this.byId("lineChart");

      // // Sample dynamic data (could come from a model or API)
      // var aDataPoints = [
      //   { value: 33.1, label: "May", secondaryLabel: "Q2" },
      //   { value: 12, label: "June" },
      //   { value: 51.4, label: "July", secondaryLabel: "Q3" },
      //   { value: 52, label: "Aug" },
      //   { value: 69.9, label: "Sep" },
      //   { value: 0.9, label: "Oct", secondaryLabel: "Q4" }
      // ];

      // // Add points to the chart dynamically
      // aDataPoints.forEach(function (point) {
      //   oChart.addAggregation("points", new InteractiveLineChartPoint({
      //     value: point.value,
      //     label: point.label,
      //     secondaryLabel: point.secondaryLabel
      //   }));
      // });
    },



    _updateChartWithForecastData: function () {
      var oChart = this.byId("lineChart");
  
      var forecastData = this.getView().getModel("forecastModel").getData().ForecastData;
  
      if (!forecastData || forecastData.length === 0) {
          console.error("No forecast data available for the chart.");
          return;
      }
  
      oChart.removeAllAggregation("points");
  
      forecastData.forEach(function (item) {
          oChart.addAggregation("points", new InteractiveLineChartPoint({
            value: item.Forecast, 
            label: item.Date,  
            secondaryLabel: item.Lower_CI ? "Lower CI: " + item.Lower_CI : "", 
            tooltip: "Forecast: " + item.Forecast + "\n" +  // Add tooltip with full details
            "Lower CI: " + item.Lower_CI + "\n" +
            "Upper CI: " + item.Upper_CI
          }));
      });
  },




    // handleroutingtoAnalyticalPage: function () {
    //     this.getRouter().navTo("RouteAnalyticalPage");
    // },

    // handleroutingtoDashboardPage: function () {
    //     this.getRouter().navTo("RouteDashboardPage");
    // },


    // getRouter: function () {
    //     return sap.ui.core.UIComponent.getRouterFor(this);
    // },



    //---> it will make a call to our service (catelogservice ---> fetch the data of the student entity and will return it to the ui5 users)
    // getStudentsData : function() {



    //   let CatelogServiceModel = this.getOwnerComponent().getModel("mainModel");

    //   // let BusinessServiceModel = this.getOwnerComponent().getModel("businessmodel");





    //   //cap -srv endpoint

    //   //HANA 



    // },

  


    onUpload: function (e) {

      
      //1. onupload is called ----------> (e) event

      //2. let file = e.getParameter("files")[0]

      //3. import(file)

      this._import(e.getParameter("files") && e.getParameter("files")[0]);


      var oModel = new JSONModel({ //if we need to send this model to the srv should we create a Odatamodel
        "results": []
      });
      this.getView().setModel(oModel, "localModel");
    },

    _import: function (file) {





      // this doesnt work inside callback
      var that = this;


      if (file && window.FileReader) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: 'binary'
          });
          var excelData = [];
          workbook.SheetNames.forEach(function (sheetName) {
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
              excelData: excelData
            })

            that.getView().setModel("excelData", oModel1)


            //IMPLEMENT BACKEND CALL

            // if (excelData.length > 0) {
            //   that.createRecords(excelData);
            // }





            MessageToast.show("Excel file uploaded successfully.");
          } else {
            MessageToast.show("Uploaded Excel file is empty.");
          }
        };
        reader.onerror = function (ex) {
          console.error("Error occurred while reading the file:", ex);
        };
        reader.readAsBinaryString(file);
      } else {
        MessageToast.show("No file uploaded or FileReader not supported.");
      }
    },


    onSave: function () {
      var oModel = this.getView().getModel("localModel");
      var excelData = oModel.getData().results;

      debugger

      if (excelData.length > 0) {
        this.createRecords(excelData);
      } else {
        MessageToast.show("No data to save.");
      }
    },

    createRecords: function (excelData) {



      let OModel = this.getOwnerComponent().getModel("mainModel") //SRV --- CATELOGSERIVCE

      //GET


      //GET / POST

      //CONTEXT BINDING  ---> SINGLE GET/POST
      //LISTBINDING ------> ROWS (MUTIPLE RECORDS)

      //  OModel.bindList("/ForecastData").requestContexts(0,100).then(

      //    function(contexts) {

      //     let data = contexts.map(contexts => contexts.getObject());

      //     console.log("Data Received from ForecastData entity", data)

      //    },

      //    function(err) {

      //     console.log("error occured", err)

      //    }

      //   )



      //POST CALL


      // let ExcelData =  this.getView().getModel("excelData").getData()

      // console.log("exceldata", ExcelData)


      // debugger

      //extracted from excel  (8,300)
      const ForecastData = [
        {
          ID: 1,
          Date: "2024-12-01",
          Forecast: 1500.00,
          Lower_CI: 1200.00,
          Upper_CI: 1800.00
        }
      ];

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
      let mainModel = this.getOwnerComponent().getModel("mainModel") //SRV --- CATELOGSERIVCE

      //create binding
      let oListbinding = mainModel.bindList(
        "/ForecastData",
        null,
        null,
        null
      )



      //context 
      let oContext = oListbinding.create(excelData)

      oContext.created().then(
        function () {
          let data = oContext.getObject()
        }
      ).catch((err) => {

        console.log("error occured", err)
      })


    },





  });
});


//entity --> odata call
//actrion/functions --- ajax call