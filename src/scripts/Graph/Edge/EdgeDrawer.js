import canvasStyles from '../canvasStyles.json';
import * as coordinatePlaneUtils from '../../utils/coordinatePlane.js';
import { rightTriangleHeight } from '../../utils/geometry.js';
import Point from '../../Canvas/Point';


const vertexStyles = canvasStyles['vertex'];
const edgeStyles = canvasStyles['edge'];


/**
 * @param {CanvasFacade} canvas
 */
export default function EdgeDrawer(canvas) {
    this.canvas = canvas;
    this.slope_angle = null;
}


EdgeDrawer.prototype.drawEdge = function(edge) {
    this.slope_angle = this.canvas.getEdgeSlopeAngle(edge);

    this.canvas.setStyles({"fillStyle": edgeStyles['defaultColor']});
    this.canvas.setRotate(this.slope_angle);

    this._drawEdgeRectangle(edge);
    if (edge.oriented)
        this._drawEdgeArrow(edge);

    this.canvas.resetRotate();

    if (edge.weight !== null)
        this._drawEdgeWeightText(edge);
}


EdgeDrawer.prototype._drawEdgeRectangle = function(edge) {
    let vertex1_pos = edge.vertex1.position();
    let vertex2_pos = edge.vertex2.position();
    
    let rotated_start_point = coordinatePlaneUtils.rotatePoint(
        vertex1_pos,
        -this.slope_angle
    );

    let length = coordinatePlaneUtils.distance(vertex1_pos, vertex2_pos);
    if (edge.oriented)
        length -= rightTriangleHeight(edgeStyles['arrowSide']) + vertexStyles['radius'];
    
    this.canvas.fillRect(
        rotated_start_point.x,
        rotated_start_point.y - edgeStyles['width'] / 2,
        length,
        edgeStyles['width']
    );
}


EdgeDrawer.prototype._drawEdgeArrow = function(edge) {
    let rotated_second_vertex_center = coordinatePlaneUtils.rotatePoint(
        edge.vertex2.position(),
        -this.slope_angle
    );

    let point1 = new Point(
        rotated_second_vertex_center.x - vertexStyles['radius'],
        rotated_second_vertex_center.y
    )
    let point2 = new Point(
        point1.x - rightTriangleHeight(edgeStyles['arrowSide']),
        point1.y - edgeStyles['arrowSide'] / 2
    )
    let point3 = new Point(
        point2.x,
        point2.y + edgeStyles['arrowSide']
    )

    this.canvas.fillTriangle(point1, point2, point3);
}


EdgeDrawer.prototype._drawEdgeWeightText = function(edge) {
    let edge_center = coordinatePlaneUtils.segmentCenter(
        edge.vertex1.position(),
        edge.vertex2.position()
    );

    this.canvas.updateStyles(edgeStyles['fontStyles']);

    let weight_text = edge.weight.toString();
    let text_measurment = this.canvas.measureText(weight_text);
    let border_width = edgeStyles['weightTextRectangleBorderWidth'];
    let bounding_rectangle_width = text_measurment.actualBoundingBoxRight + edgeStyles['width'] / 2;
    let bounding_rectangle_height = text_measurment.actualBoundingBoxAscent + edgeStyles['width'] / 2;

    this.canvas.fillRect(
        edge_center.x - bounding_rectangle_width - border_width,
        edge_center.y - bounding_rectangle_height - border_width,
        (bounding_rectangle_width + border_width) * 2,
        (bounding_rectangle_height + border_width) * 2
    );
    this.canvas.updateStyles({"fillStyle": edgeStyles['weightTextBackgroundColor']});
    this.canvas.fillRect(
        edge_center.x - bounding_rectangle_width,
        edge_center.y - bounding_rectangle_height,
        bounding_rectangle_width * 2,
        bounding_rectangle_height * 2
    );
    this.canvas.updateStyles({"fillStyle": edgeStyles['weightTextColor']});
    this.canvas.fillText(weight_text, edge_center.x, edge_center.y)
}
