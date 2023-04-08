

/**
 * @param {Number} id Unique numerical identifier
 * @param {Vertex} vertex1 First vertex
 * @param {Vertex} vertex2 Second vertex
 * @param {boolean} oriented Is edge oriented
 * @param {Number} [weight=null]
 */
export default function Edge(id, vertex1, vertex2, oriented, weight = null) {
    this.id = id;
    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
    this.oriented = oriented,
    this.weight = weight;
}

