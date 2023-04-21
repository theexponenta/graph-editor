import BaseTool from './BaseTool.js';
import { downloadFile } from '../utils/mics.js';


export default function ExportProjectTool() {
    BaseTool.call(this, "export_project", null, true);
}


ExportProjectTool.prototype = Object.create(BaseTool.prototype);
ExportProjectTool.prototype.constructor = ExportProjectTool;


ExportProjectTool.prototype.activate = function(application) {
    downloadFile('graph.json', "text/plain", JSON.stringify(application));
}
