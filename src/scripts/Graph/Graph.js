

export default function Graph() {
    this.vertices = [];
    this.edges = [];
}


/**
 * 
 * @param {Vertex} vertex 
 */
Graph.prototype.addVertex = function(vertex) {
    this.vertices.push(vertex);
}


Graph.prototype.addEdge = function(edge) {
    this.edges.push(edge);
}
