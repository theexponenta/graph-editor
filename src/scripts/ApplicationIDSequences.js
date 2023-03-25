

export default function ApplicationIDSequences() {
    this.vertex_id = 1;
    this.edge_id = 1;
}


ApplicationIDSequences.prototype.incrementVertexId = function() {
    this.vertex_id++;
}


ApplicationIDSequences.prototype.incrementEdgeId = function() { 
    this.edge_id++;
};
