import { ObjectMissingSomeOfRequiredPropertiesError } from "../exceptions/deserialization";
import { objectHasOwnProperties } from "../utils/mics";
import Edge from "./Edge/Edge";
import Vertex from "./Vertex/Vertex";


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


Graph.prototype.getVertexById = function(vertex_id) {
    return this.vertices.find((vertex) => vertex.id == vertex_id);
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


Graph.prototype.toJSON = function() {
    return {
        vertices: this.vertices,
        edges: this.edges
    };
}


Graph.fromObject = function(object) {
    let graph = new Graph();
    graph.vertices = object['vertices'].map(Vertex.fromObject);

    let vertex1;
    let vertex2;
    for (let edge_object of object['edges']) {
        if (!objectHasOwnProperties(edge_object, ['id', 'vertex1', 'vertex2']))
            throw new ObjectMissingSomeOfRequiredPropertiesError();

        vertex1 = graph.getVertexById(edge_object['vertex1']);
        vertex2 = graph.getVertexById(edge_object['vertex2']);

        if (!vertex1 || !vertex2)
            throw new Error("One of vertexes is invalid");

        graph.addEdge(new Edge(
            edge_object['id'],
            vertex1,
            vertex2,
            edge_object['oriented'] || false,
            edge_object['weight'] || null
        ))
    }

    return graph;
}
