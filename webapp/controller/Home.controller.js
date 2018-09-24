sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("pinaki.ey.tableviewer.controller.Home", {
		onInit : function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Home").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			this.loadTableHelp();
		},
		loadTableHelp : function(){
			var that  = this;
			$.ajax({
				url: '/eyhcp/CIO/GenerateData/Scripts/TableDisplay.xsjs?tableName="_SYS_BIC"."Pinaki.CIODashboard.model/CA_TABLES_VIEWS"',
				cache: false,
				success: function (data) {
					that.getView().getModel().setSizeLimit(99999);
					that.getView().getModel().setProperty('/tableValueHelp',data);
				}
			});
		},
		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("tableViewer", {
				tableName: btoa(this.getView().byId('idTableNameInput').getValue())
			});
		}
	});
});