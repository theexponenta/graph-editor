import Queue from "../../DataStructures/Queue/Queue";


export default function BFS(graph) {
    this.graph = graph;
}

/**
 * 
 * @param {Vertex} start_vertex 
 */
BFS.prototype.traverse = function(start_vertex) {
    let traversal = [];
    traversal.push(start_vertex);

    let queue = new Queue();
    queue.push(start_vertex);

    let used_vertices = new Set();
    used_vertices.add(start_vertex);

    let adjacency_list = this.graph.toAdjacencyList();
    let current_vertex;
    while (!queue.empty()) {
        current_vertex = queue.front();
        queue.pop();

        for (let neighbour of adjacency_list.get(current_vertex)) {
            if (used_vertices.has(neighbour))
                continue;

            traversal.push(neighbour);
            queue.push(neighbour);
            used_vertices.add(neighbour);
        }
    }

    return traversal;
}
