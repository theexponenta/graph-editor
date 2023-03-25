import setDOMEventHandlers from './DOMEventHandlers/main';
import * as ApplicationDOMUtils from './utils/DOMUtils/application.js';
import GraphCanvasFacade from './Canvas/GraphCanvasFacade.js';
import { tools } from './Tools/tools.js';
import Vertex from './Graph/Vertex/Vertex';
import ApplicationIDSequences from './ApplicationIDSequences';
import Graph from './Graph/Graph';


export function Application() {
    this.canvas = new GraphCanvasFacade(document.getElementById("canvas"));
    this.sequences = new ApplicationIDSequences();
    this.graph = new Graph();
    this.selected_tool = null;
}


Application.prototype.init = function() {
    setDOMEventHandlers(this);
}


Application.prototype.selectTool = function(toolaname) {
    if (this.selected_tool)
        this.selected_tool.deactivate();

    this.selected_tool = new tools[toolaname]();
    this.selected_tool.activate(this);
}


Application.prototype.redrawGraph = function() {
    this.canvas.clear();
    this.canvas.drawGraph(this.graph);
}


Application.prototype.addVertex = function(x, y) {
    let vertex = new Vertex(this.sequences.vertex_id, x, y);
    this.graph.addVertex(vertex);
    this.sequences.incrementVertexId();
    this.redrawGraph();
}
