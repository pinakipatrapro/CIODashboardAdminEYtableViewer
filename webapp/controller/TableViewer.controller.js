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
			var tableName = atob(oEvent.getParameter("arguments").tableName);
			this.queryData(tableName);
		},
		queryData: function (tableName) {
			var that = this;
			this.getView().setBusy(true);
			$.ajax({
				url: "/eyhcp/Pinaki/RandomDataGenerator/Scripts/tableDisplay.xsjs?tableName=" + tableName,
				cache: false,
				success: function (data) {
					that.getView().setBusy(false);
					that.getView().getModel().setData({
						tableData: data,
						tableDataCopy: data,
						tableName: tableName
					}, true);
					that.processData();
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
				var input = new sap.m.Input({
					value: "{" + e + "}"
				});
				var column = new tableColumn({
					label: new sap.m.Label({
						text: e
					}),
					sortProperty: e,
					filterProperty: e,
					showFilterMenuEntry: true,
					showSortMenuEntry: true,
					template: input
				});
				table.addColumn(column);
			});
		},

	});

});