

export default function CanvasFacade(canvas_element) {
    this.canvas = canvas_element;
    this.styles = {};
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
    this._setContextStyles(context, this.styles);

    return context;
}


CanvasFacade.prototype.resize = function(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
}


CanvasFacade.prototype.fillText = function(text, x, y, max_width = undefined) {
    let context = this.get2DContext();
    context.fillText(text, x, y, max_width);
}


CanvasFacade.prototype.clear = function() {
    let context = this.get2DContext();
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
