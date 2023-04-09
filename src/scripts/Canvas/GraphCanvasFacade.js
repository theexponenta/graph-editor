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


GraphCanvasFacade.prototype.getEdgeSlopeAngle = function(edge) {
    let vertex1_pos = edge.vertex1.position();
    let vertex2_pos = edge.vertex2.position();

    let tan_slope_angle = (vertex1_pos.y - vertex2_pos.y) / (vertex1_pos.x - vertex2_pos.x);

    let slope_angle = Math.atan(tan_slope_angle);
    if (vertex1_pos.x >= vertex2_pos.x)
        slope_angle += Math.PI;

    return slope_angle;
}


/**
 * 
 * @param {Vertex} vertex 
 * @param {Point} position 
 * 
 * position represents real postion on the canvas, not position of mouse pointer over the canvas
 */
GraphCanvasFacade.prototype.isVertexOnPosition = function(vertex, position) {
    return isPointInCircle(
        position,
        vertex.position(),
        canvasStyles['vertex']['radius']
    );
}


/**
 * 
 * @param {Graph} graph 
 * @param {Point} position 
 * 
 * position represents real postion on the canvas, not position of mouse pointer over the canvas
 */
GraphCanvasFacade.prototype.getVertexOnPosition = function(graph, position) {
    for (let vertex of graph.vertices) {
        if (this.isVertexOnPosition(vertex, position))
            return vertex;
    }

    return null;
}

