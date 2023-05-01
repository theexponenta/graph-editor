import BaseTool from '../BaseTool.js';


export default function AddVertexTool() {
    BaseTool.call(this, "add_vertex", null);
}


AddVertexTool.prototype = Object.create(BaseTool.prototype);
AddVertexTool.prototype.constructor = AddVertexTool;


AddVertexTool.prototype.addVertex = function(application, click_event) {
    let canvasPosition = application.canvas.mousePositionToCanvasPosition(click_event.offsetX, click_event.offsetY);
    application.addVertex(canvasPosition.x, canvasPosition.y);
}


AddVertexTool.prototype.activate = function(application) {
    this.setEventListener(application.canvas, 'click', this.addVertex.bind(this, application));
}
