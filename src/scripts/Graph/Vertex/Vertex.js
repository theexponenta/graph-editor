import VertexCanvasProperties from './VertexCanvasProperties.js';
import Point from '../../Canvas/Point.js';


/**
 * @param {Number} id Unique numerical identifier
 * @param {Number} positionX
 * @param {Number} positionY
 */
export default function Vertex(id, positionX, positionY) {
    this.id = id;
    this.canvasProperties = new VertexCanvasProperties(positionX, positionY);
}


Vertex.prototype.highlight = function() {
    this.canvasProperties.highlited = true;
}


Vertex.prototype.unhighlight = function() {
    this.canvasProperties.highlited = false;
}


Vertex.prototype.move = function(movementX, movementY) {
    this.canvasProperties.positionX += movementX;
    this.canvasProperties.positionY += movementY;
}


Vertex.prototype.position = function() {
    return new Point(
        this.canvasProperties.positionX,
        this.canvasProperties.positionY
    );
}
