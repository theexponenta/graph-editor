

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


Graph.prototype._deleteVertexOrEdge = function(id, sequence) {
    let index = sequence.findIndex((element) => element.id = id);
    if (index == -1)
        return;

    let spliced = sequence.splice(index, 1);
    return spliced[0];
}


Graph.prototype.deleteVertex = function(vertex_id) {
    this.edges = this.edges.filter((edge) => !edge.hasVertex(vertex_id));
    this.vertices = this.vertices.filter((vertex) => vertex.id != vertex_id);
}


Graph.prototype.deleteEdge = function(edge_id) {
    this.edges = this.edges.filter((edge) => edge.id != edge_id);
}
