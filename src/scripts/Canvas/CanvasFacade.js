import Point from "./Point";


export default function CanvasFacade(canvas_element) {
    this.canvas = canvas_element;
    this.styles = {};

    this.scale = 1;

    this.rotate_angle = 0;

    this.translateX = 0;
    this.translateY = 0;
}


CanvasFacade.prototype.canvasElement = function() {
    return this.canvas;
};


CanvasFacade.prototype.addEventListener = function() {
    this.canvas.addEventListener(...arguments);
}


CanvasFacade.prototype.removeEventListener = function() {
    this.canvas.removeEventListener(...arguments);
}


CanvasFacade.prototype.get2DContext = function() {
    let context = this.canvas.getContext('2d');
    context.resetTransform();
    this._setContextStyles(context, this.styles);
    context.translate(this.translateX, this.translateY);
    context.rotate(this.rotate_angle);
    context.scale(this.scale, this.scale);

    return context;
}


/**
 * Rotate around origin point
 * @param {Number} angle 
 * @param {Point} origin 
 */
CanvasFacade.prototype.setRotate = function(angle) {
    this.rotate_angle = angle;
}


CanvasFacade.prototype.resetRotate = function() {
    this.rotate_angle = 0;
}


CanvasFacade.prototype.setScale = function(scale_value) {
    this.scale = scale_value;
}


CanvasFacade.prototype.multiplyScale = function(scale_factor) {
    this.setScale(this.scale * scale_factor);
}


CanvasFacade.prototype.mouseRelativeScale = function(scale_factor, mouse_x, mouse_y) {
    let positionBefore = this.mousePositionToCanvasPosition(mouse_x, mouse_y);
    this.multiplyScale(scale_factor);
    let positionAfter = this.mousePositionToCanvasPosition(mouse_x, mouse_y);

    this.incrementTranslateValues(
        (positionAfter.x - positionBefore.x) * this.scale,
        (positionAfter.y - positionBefore.y) * this.scale,
    )
}


CanvasFacade.prototype.setTranslateValues = function(x, y) {
    this.translateX = x;
    this.translateY = y;
}


CanvasFacade.prototype.incrementTranslateValues = function(incrementX, incrementY) {
    this.setTranslateValues(this.translateX + incrementX, this.translateY + incrementY);
}


/**
 * 
 * @param {Number} coordinate_value 
 * @param {Number} scale_value 
 */
CanvasFacade.prototype.scaleCoordinate = function(coordinate_value) {
    return coordinate_value / this.scale;
}


/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * 
 * Coordinates of mouse pointer relative to the canvas
 */
CanvasFacade.prototype.mousePositionToCanvasPosition = function(x, y) {
    return new Point(
        this.scaleCoordinate(x - this.translateX),
        this.scaleCoordinate(y - this.translateY)
    );
}


CanvasFacade.prototype.resize = function(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
}


CanvasFacade.prototype.fillRect = function(x, y, width, height) {
    let context = this.get2DContext();
    context.fillRect(x, y, width, height);
}


CanvasFacade.prototype.fillText = function(text, x, y, max_width = undefined) {
    let context = this.get2DContext();
    context.fillText(text, x, y, max_width);
}


CanvasFacade.prototype.clear = function() {
    let context = this.get2DContext();
    context.clearRect(
        this.scaleCoordinate(-this.translateX),
        this.scaleCoordinate(-this.translateY),
        this.scaleCoordinate(this.canvas.width),
        this.scaleCoordinate(this.canvas.height)
    );
}


/**
 * @param {CanvasRenderingContext2D} context
 * @param {object} styles
 */
CanvasFacade.prototype._setContextStyles = function(context, styles) {
    for (let property in styles) {
        if (styles[property])
            context[property] = styles[property]
    }
}


/**
 * @param {object} styles
 */
CanvasFacade.prototype.setStyles = function(styles) {
    this.styles = styles;
}


/**
 * @param {object} styles
 */
CanvasFacade.prototype.updateStyles = function(styles) {
    for (let property in styles)
        this.styles[property] = styles[property];
}


CanvasFacade.prototype._circle = function(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
}


CanvasFacade.prototype.strokeCircle = function(x, y, radius) {
    let context = this.get2DContext();
    this._circle(context, x, y, radius);
    context.stroke();
}


CanvasFacade.prototype.fillCircle = function(x, y, radius) {
    let context = this.get2DContext();
    this._circle(context, x, y, radius);
    context.fill();
}


CanvasFacade.prototype.fillTriangle = function(point1, point2, point3) {
    let context = this.get2DContext();
    context.beginPath();
    context.moveTo(point1.x, point1.y);
    context.lineTo(point2.x, point2.y);
    context.lineTo(point3.x, point3.y);
    context.moveTo(point2.x, point2.y);
    context.lineTo(point3.x, point3.y);
    context.fill();
}


CanvasFacade.prototype.measureText = function(text) {
    let context = this.get2DContext();
    return context.measureText(text);
}
