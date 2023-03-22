import setDOMEventHandlers from './DOMEventHandlers/main';
import * as ApplicationDOMUtils from './utils/DOMUtils/application.js';
import GraphCanvasFacade from './Canvas/GraphCanvasFacade.js';
import { tools } from './Tools/tools.js';


export function Application() {
    this.canvas = new GraphCanvasFacade(document.getElementById("canvas"));
    this.selected_tool = null;
}


Application.prototype.init = function() {
    setDOMEventHandlers(this);
    ApplicationDOMUtils.resizeCanvas(this.canvas.canvasElement());
}


Application.prototype.selectTool = function(toolaname) {
    if (this.selected_tool)
        this.selected_tool.deactivate();

    this.selected_tool = new tools[toolaname]();
    this.selected_tool.activate(this);
}


Application.prototype.addVertex = function(x, y) {
    // Вскоре будет реализовано
}
