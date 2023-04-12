import setDOMEventHandlers from './DOMEventHandlers/main';
import GraphCanvasFacade from './Canvas/GraphCanvasFacade.js';
import { tools } from './Tools/tools.js';
import Vertex from './Graph/Vertex/Vertex';
import Edge from './Graph/Edge/Edge.js';
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


Application.prototype.deleteVertex = function(vertex_id) {
    this.graph.deleteVertex(vertex_id);
}


Application.prototype.addEdge = function(vertex1, vertex2, oriented, weight) {
    let edge = new Edge(this.sequences.edge_id, vertex1, vertex2, oriented, weight)
    this.graph.addEdge(edge);
    this.sequences.incrementEdgeId();
    this.redrawGraph();
}


Application.prototype.deleteEdge = function(edge_id) {
    this.graph.deleteEdge(edge_id);
}

