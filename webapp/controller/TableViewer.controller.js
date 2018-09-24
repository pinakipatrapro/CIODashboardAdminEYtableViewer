sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/table/Column",
	"sap/ui/export/Spreadsheet",
	"sap/m/MessageToast"
], function (Controller, tableColumn, Spreadsheet, MessageToast) {
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
				url: "/eyhcp/CIO/GenerateData/Scripts/TableDisplay.xsjs?tableName=" + tableName,
				cache: false,
				success: function (data) {
					that.getView().setBusy(false);
					that.getView().getModel().setData({
						tableData: data,
						tableDataCopy: data,
						tableName: tableName
					}, false);
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
			table.removeAllColumns();
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
		createColumnConfig: function (aData) {
			var aColumns = [];
			Object.keys(aData[0]).forEach(function (e) {
				aColumns.push({
					label: e,
					property: e
				});
			});
			return aColumns;
		},
		onExport: function () {
			var aCols, aData, oSettings;
			aData = this.getView().getModel().getProperty("/tableData");
			aCols = this.createColumnConfig(aData);

			oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: aData,
				context : {
					sheetName: this.getView().getModel().getProperty("/tableName")
				},
				fileName: this.getView().getModel().getProperty("/tableName")
			};

			new Spreadsheet(oSettings)
				.build()
				.then(function () {
					MessageToast.show("Spreadsheet export has finished");
				});
		}

	});

});