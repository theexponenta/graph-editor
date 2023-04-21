import setDOMEventHandlers from './DOMEventHandlers/main';
import GraphCanvasFacade from './Canvas/GraphCanvasFacade.js';
import Vertex from './Graph/Vertex/Vertex';
import Edge from './Graph/Edge/Edge.js';
import ApplicationIDSequences from './ApplicationIDSequences';
import Graph from './Graph/Graph';
import * as applicationConfig from './applicationConfig.json';
import { getCanvas } from './utils/DOMUtils/application/canvas';


export function Application() {
    if (this.tryInitFromLocalStorage())
        return;

    this.canvas = new GraphCanvasFacade(getCanvas());
    this.sequences = new ApplicationIDSequences();
    this.graph = new Graph();
    this.selected_tool = null;
}


Application.prototype.init = function() {
    setDOMEventHandlers(this);
    setInterval(this.saveToLocalStorage.bind(this), applicationConfig['autosaveInterval']);
}


Application.prototype.selectTool = function(tool) {
    tool.activate(this);
    if (tool.single_action)
        return;
    
    if (this.selected_tool)
        this.selected_tool.deactivate();

    this.selected_tool = tool;
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


Application.prototype.saveToLocalStorage = function() {
    localStorage.setItem("application", JSON.stringify(this));
}


Application.prototype.toJSON = function() {
    return {
        graph: this.graph,
        canvas: this.canvas,
        sequences: this.sequences
    };
}


Application.prototype.initFromJSON = function(json_string) {
    let object = JSON.parse(json_string);
    
    let graph = Graph.fromObject(object['graph']);
    let sequences = ApplicationIDSequences.fromObject(object['sequences']);
    let canvas = new GraphCanvasFacade(getCanvas());
    canvas.initFromObject(object['canvas']);

    this.graph = graph;
    this.sequences = sequences;
    this.canvas = canvas;

    this.redrawGraph();
}


Application.prototype.tryInitFromLocalStorage = function() {
    let saved_data = localStorage.getItem("application");
    if (!saved_data)
        return false;

    try {
        this.initFromJSON(saved_data);
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}
