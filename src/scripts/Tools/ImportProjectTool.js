import BaseTool from './BaseTool.js';
import { downloadFile } from '../utils/mics.js';


export default function ImportProjectTool() {
    BaseTool.call(this, "import_project", null, true);
}


ImportProjectTool.prototype = Object.create(BaseTool.prototype);
ImportProjectTool.prototype.constructor = ImportProjectTool;


ImportProjectTool.prototype.activate = function(application) {
    let input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", this.fileSelected.bind(this, application));
    input.click();
}


ImportProjectTool.prototype.fileSelected = function(application, change_event) {
    let reader = new FileReader();
    reader.readAsText(change_event.target.files[0], 'UTF-8');
    reader.addEventListener("load", this.fileRead.bind(this, application));
}


ImportProjectTool.prototype.fileRead = function(application, load_event) {
    try {
        application.initFromJSON(load_event.target.result);
    } catch {
        alert("Error");
    }
}
