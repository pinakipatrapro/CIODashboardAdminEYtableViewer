sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/table/Column"
], function (Controller, tableColumn) {
	"use strict";

	return Controller.extend("pinaki.ey.tableviewer.controller.TableViewer", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("tableViewer").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var tableName = oEvent.getParameter("arguments").tableName;
			this.queryData(tableName);
		},
		queryData: function (tableName) {
			var that = this;
			$.ajax({
				url: "/eyhcp/Pinaki/RandomDataGenerator/Scripts/tableDisplay.xsjs?tableName=" + tableName,
				cache: false,
				success: function (data) {
					that.getView().getModel().setData({
						tableData: data,
						tableName: tableName
					}, true);
					that.processData().bind(that);
				}
			});
		},
		processData: function () {
			var oModel = this.getView().getModel();
			var tableData = oModel.getData().tableData;
			var objKeys = [];
			for (var k in tableData[0]) objKeys.push(k);
			this.createTableColumns(objKeys);
		},
		createTableColumns: function (objKeys) {
			var table = this.getView().byId('idDataTable');
			objKeys.forEach(function (e) {
				var column = new tableColumn({
					label: new sap.m.Label({
						text: e
					}),
					template: new sap.m.Input({
						value: "{" + e + "}"
					})
				});
				table.addColumn(column);
			});
		}

	});

});