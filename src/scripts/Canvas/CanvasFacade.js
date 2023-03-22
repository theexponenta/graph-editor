

export default function CanvasFacade(canvas_element) {
    this.canvas = canvas_element;
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
