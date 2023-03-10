

export function Application() {
    this.canvas = document.getElementById("canvas");
}


Application.prototype.resizeCanvas = function() {
    this.canvas.height = this.canvas.parentNode.clientHeight;
    this.canvas.width = this.canvas.parentNode.clientWidth;
}


Application.prototype._setEventListeners = function() {
    window.addEventListener("resize", this.resizeCanvas);
}


Application.prototype.init = function() {
    this._setEventListeners();
    this.resizeCanvas();
}
