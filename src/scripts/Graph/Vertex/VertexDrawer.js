import canvasStyles from '../canvasStyles.json';


const vertexStyles = canvasStyles['vertex'];


/**
 * @param {CanvasFacade} canvas
 */
export default function VertexDrawer(canvas) {
    this.canvas = canvas
}


VertexDrawer.prototype._drawVertexCircle = function(vertex) {
    let vertex_pos = vertex.position();
    
    this.canvas.strokeCircle(
        vertex_pos.x,
        vertex_pos.y,
        vertexStyles['radius']
    );

    this.canvas.fillCircle(
        vertex_pos.x,
        vertex_pos.y,
        vertexStyles['radius'] - vertexStyles['lineWidth'] / 2
    );
}


VertexDrawer.prototype._drawVertexText = function(vertex) {
    let vertex_pos = vertex.position();
    this.canvas.fillText(
        vertex.id.toString(),
        vertex_pos.x,
        vertex_pos.y
    )
}


/**
 * @param {Vertex} vertex Vertex to draw
 */
VertexDrawer.prototype.drawVertex = function(vertex) {
    let fill_style = vertex.canvasProperties.highlited ? vertexStyles['highlightedFillColor'] :
        vertexStyles['defaultFillColor'];

    this.canvas.setStyles({
        strokeStyle: vertexStyles['mainColor'],
        fillStyle: fill_style,
        lineWidth: vertexStyles['lineWidth'],
        font: vertexStyles['font'],
        textBaseline: vertexStyles['textBaseline'],
        textAlign: vertexStyles['textAlign']
    });

    this._drawVertexCircle(vertex);
    this.canvas.updateStyles({fillStyle: vertexStyles['mainColor']});
    this._drawVertexText(vertex);
}
