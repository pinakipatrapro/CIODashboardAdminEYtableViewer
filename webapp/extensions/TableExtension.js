sap.ui.define([
	"sap/ui/table/Table"
], function (Table) {
	"use strict";

	var PanelExtension = Table.extend("pinaki.ey.tableviewer..extensions.TableExtension", {
		metadata: {
			properties: {
				title: {
					type: "string"
				}
			}
		}
	});

	PanelExtension.prototype.init = function () {
		Table.prototype.init.apply(this, arguments);

	};
	PanelExtension.prototype.onBeforeRendering = function () {
		Table.prototype.onAfterRendering.apply(this, arguments);
	};

	return PanelExtension;
});