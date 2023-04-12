import CanvasFacade from "./CanvasFacade.js";
import VertexDrawer from "../Graph/Vertex/VertexDrawer.js";
import EdgeDrawer from "../Graph/Edge/EdgeDrawer.js";
import canvasStyles from '../Graph/canvasStyles.json'
import Point from "./Point.js";
import {
    distance,
    isPointInCircle,
    isPointInRectangle,
    rotatePoint 
} from '../utils/coordinatePlane.js';


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


/**
 * 
 * @param {Graph} graph 
 * @param {Point} position 
 * 
 * position represents real postion on the canvas, not position of mouse pointer over the canvas
 */
GraphCanvasFacade.prototype.getEdgeOnPosition = function(graph, position) {
    for (let edge of graph.edges) {
        if (this.isEdgeOnPosition(edge, position))
            return edge;
    }

    return null;
}


/**
 * 
 * @param {edge} edge 
 * @param {Point} position 
 * 
 * position represents real postion on the canvas, not position of mouse pointer over the canvas
 */
GraphCanvasFacade.prototype.isEdgeOnPosition = function(edge, position) {
    let slope_angle = this.getEdgeSlopeAngle(edge);
    
    let position_rotated = rotatePoint(position, -slope_angle);
    let vertex1_pos_rotated = rotatePoint(edge.vertex1.position(), -slope_angle);
    let vertex2_pos_rotated = rotatePoint(edge.vertex2.position(), -slope_angle);
    let edge_length = distance(vertex1_pos_rotated, vertex2_pos_rotated);

    let leftmost_vertex_pos = vertex1_pos_rotated;
    if (vertex1_pos_rotated.x > vertex2_pos_rotated.x)
        leftmost_vertex_pos = vertex2_pos_rotated

    let edge_rectangle_top_left_point = new Point(
        leftmost_vertex_pos.x,
        leftmost_vertex_pos.y - canvasStyles['edge']['width'] / 2
    )

    return isPointInRectangle(
        position_rotated,
        edge_rectangle_top_left_point,
        edge_length,
        canvasStyles['edge']['width']
    );
}


/**
 * 
 * @param {Graph} graph 
 * @param {Point} position 
 * 
 * position represents real postion on the canvas, not position of mouse pointer over the canvas
 */
GraphCanvasFacade.prototype.getVertexOrEdgeOnPosition = function(graph, position) {
    let vertex = this.getVertexOnPosition(graph, position);
    if (vertex)
        return vertex;

    return this.getEdgeOnPosition(graph, position);
}

