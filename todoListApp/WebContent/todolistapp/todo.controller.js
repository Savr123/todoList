sap.ui.define([
	"jquery.sap.global",
	"sap/m/MessageToast",
	"sap/ui/core/format/DateFormat",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(jQuery, MessageToast, DateFormat, Controller, JSONModel) {
	"use strict";
	

	return Controller.extend("todoListApp.todolistapp.todo",{
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf todolistapp.todo
*/
		onInit: function() {
			var sPath = sap.ui.require.toUrl("todolistapp") + "/tasks.json";	//path to JSON model
			var oModel = new JSONModel(sPath);									//obj with JSON data
			this.getView().setModel(oModel);
		},
		
		onPost: function(event) {
			var oFormat = DateFormat.getDateTimeInstance({ style: "medium" });
			var oDate = new Date();
			var sDate = oFormat.format(oDate);
			// create new entry
			var sValue = event.getParameter("value");
			var oEntry = {
				Date: "" + sDate,
				task: sValue
			};

			// update model
			var oModel = this.getView().getModel();
			var aEntries = oModel.getData().EntryCollection;
			aEntries.unshift(oEntry);
			oModel.setData({
				EntryCollection: aEntries
			});
		},

		onDone: function(event) {
			
		},

		onFailed: function(event) {
			
		},
		onItemClose: function(event){
		}
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf todolistapp.todo
*/
	//	onBeforeRendering: function() {
	//
	//	},
	
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf todolistapp.todo
*/
	//	onAfterRendering: function() {
	//
	//	},
	
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf todolistapp.todo
*/
	//	onExit: function() {
	//
	//	}
	})
});