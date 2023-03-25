import VertexCanvasProperties from './VertexCanvasProperties.js';


/**
 * @param {Number} id Unique numerical identifier
 * @param {Number} positionX
 * @param {Number} positionY
 */
export default function Vertex(id, positionX, positionY) {
    this.id = id;
    this.canvasProperties = new VertexCanvasProperties(positionX, positionY);
}
