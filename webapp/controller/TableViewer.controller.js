sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("pinaki.ey.tableviewer.tableviewer.controller.TableViewer", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("tableViewer").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var tableName = oEvent.getParameter("arguments").tableName;
			this.queryData(tableName);
		},
		queryData: function (tableName) {
			$.ajax({
				url: "/eyhcp/Pinaki/RandomDataGenerator/Scripts/tableDisplay.xsjs?tableName=" + tableName,
				cache: false,
				success: function (data) {

				}
			});
		}

	});

});