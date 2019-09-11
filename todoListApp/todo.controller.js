sap.ui.define([
	"jquery.sap.global",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/core/format/DateFormat",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
], function(jQuery, MessageToast, Fragment, DateFormat, Controller, JSONModel) {
	"use strict";


	return Controller.extend("todoListApp.todolistapp.todo",{
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf todolistapp.todo
*/
		onInit: function() {
			var sPath = sap.ui.require.toUrl("todolistapp") + "/tasks.json";	//path to JSON model
			var that = this;

			$.ajax(sPath, {
				dataType: 'json',
				success: function (data) {
					var oModel = new JSONModel(data);									//obj with JSON data
				  oModel.setDefaultBindingMode('TwoWay');
				 	that.getView().setModel(oModel);
					console.log(data);
				}
			});

			var that = this;
			Fragment.load({
				//id: this.getView().getId(),
				name: "todoList.todoListApp.changeTaskDialog",
				controller: this
			}).then(function(oDialog){
				that.getView().addDependent(oDialog);
				that.oEditDialog = oDialog;
			});

			// oModel.getData().forEach(function(el){
			//     var dataformat = new Date(el.Date);
			//     el.Date=dataFormat.toISOString();
			// })

			this.sIdCustom=4;
			// debugger;
		},

		formatDate: function (value) {
			return new Date(value).toUTCString();
		},

		onPost: function(event) {
			var oFormat = DateFormat.getDateTimeInstance({ style: "medium" });
			var oDate = new Date();
			// var sDate = oFormat.format(oDate);
			var sDate = oDate.toISOString();
			var oModel = this.getView().getModel();
			var aEntries = oModel.getData().EntryCollection;
			// create new entry
			var sValue = event.getParameter("value");
			var oEntry = {
				Date: "" + sDate,
				task: sValue,
				status: "in progress",
				id: "" + this.sIdCustom
			};
			this.sIdCustom++;

			// update model
			aEntries.unshift(oEntry);
			oModel.setData({
				EntryCollection: aEntries
			});
		},

		onDone: function(event) {
			// debugger;
			var	oControl = event.getSource();
			var oModel = oControl.getModel();
			oModel.setProperty(oControl.getBindingContext().getPath()+'/status', 'done');
			var control = sap.ui.getCore().byId(oControl.getParent().getParent().getId());
			var d=control.getDomRef();
			if(d.classList.contains("customRed")) d.classList.remove("customRed");
			if(d.classList.contains("customGreen")) d.classList.remove("customGreen")
				else d.setAttribute('class', d.getAttribute('class')+' customGreen');
		},

		onFailed: function(event) {
			var	oControl = event.getSource();
			var oModel = oControl.getModel();
			oModel.setProperty(oControl.getBindingContext().getPath()+'/status', 'failed');
			var control = sap.ui.getCore().byId(oControl.getParent().getParent().getId());
			var d=control.getDomRef();
			if(d.classList.contains("customRed")) d.classList.remove("customRed")
				else d.setAttribute('class', d.getAttribute('class')+' customRed');
			if(d.classList.contains("customGreen")) d.classList.remove("customGreen");
		},

		onCloseDialog: function(){
			this.oEditDialog.close();
		},
		saveChanges: function(event){
			// event.getSource().getParent()
		},

		onListItemPress: function(event) {
			//----------------------------------------------
			//-----------------OpenDialog-------------------
			//----------------------------------------------
				var oControl = event.getSource();

				if (this.oEditDialog) {
					this.oEditDialog.bindElement({path: oControl.getBindingContext().getPath() });
					this.oEditDialog.open();
				}
		},

		onItemClose: function(event){
			// update model
			var oModel = this.getView().getModel();
			var aEntries = oModel.getData().EntryCollection;

			var item = event.getSource()

				//
				var itemData = item.getBindingContext().getObject();

				aEntries = aEntries.filter(item => item.task !== itemData.task);

				oModel.setData({
					EntryCollection: aEntries
				});

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
