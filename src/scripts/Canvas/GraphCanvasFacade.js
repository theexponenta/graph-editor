import CanvasFacade from "./CanvasFacade.js";
import VertexDrawer from "../Graph/Vertex/VertexDrawer.js";


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


/**
 * 
 * @param {Graph} graph 
 */
GraphCanvasFacade.prototype.drawGraph = function(graph) {
    this._drawVertices(graph);
}
