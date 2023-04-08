import CanvasFacade from "./CanvasFacade.js";
import VertexDrawer from "../Graph/Vertex/VertexDrawer.js";
import EdgeDrawer from "../Graph/Edge/EdgeDrawer.js";
import canvasStyles from '../Graph/canvasStyles.json'
import { isPointInCircle } from '../utils/coordinatePlane.js';


export default function GraphCanvasFacade(canvas_element) {
    CanvasFacade.call(this, canvas_element);
}

GraphCanvasFacade.prototype = Object.create(CanvasFacade.prototype);
GraphCanvasFacade.prototype.constructor = GraphCanvasFacade;


GraphCanvasFacade.prototype._drawVertices = function(graph) {
    let vertexDrawer = new VertexDrawer(this);
    for (let vertex of graph.vertices)
        vertexDrawer.drawVertex(vertex);
}


GraphCanvasFacade.prototype._drawEdges = function(graph) {
    let edgeDrawer = new EdgeDrawer(this);
    for (let edge of graph.edges)
        edgeDrawer.drawEdge(edge);
}


/**
 * 
 * @param {Graph} graph 
 */
GraphCanvasFacade.prototype.drawGraph = function(graph) {
    this._drawEdges(graph);
    this._drawVertices(graph);
}


/**
 * 
 * @param {Vertex} vertex 
 * @param {Number} x
 * @param {Number} y
 * 
 * (x, y) represents real postion on the canvas, not position of mouse pointer over the canvas
 */
GraphCanvasFacade.prototype.isVertexOnPosition = function(vertex, x, y) {
    return isPointInCircle(
        x, y,
        vertex.canvasProperties.positionX,
        vertex.canvasProperties.positionY,
        canvasStyles['vertex']['radius']
    );
}


/**
 * 
 * @param {Graph} graph 
 * @param {Number} x 
 * @param {Number} y
 * 
 * (x, y) represents real postion on the canvas, not position of mouse pointer over the canvas
 */
GraphCanvasFacade.prototype.getVertexOnPosition = function(graph, x, y) {
    for (let vertex of graph.vertices) {
        if (this.isVertexOnPosition(vertex, x, y))
            return vertex;
    }

    return null;
}

