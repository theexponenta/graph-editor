import createStateMachine from '../../StateMachine/StateMachine.js';
import BaseTool from '../BaseTool.js';
import Vertex from '../../Graph/Vertex/Vertex.js';
import Edge from '../../Graph/Edge/Edge.js';


export default function DeleteTool() {
    BaseTool.call(this, "delete", null);
}


DeleteTool.prototype = Object.create(BaseTool.prototype);
DeleteTool.prototype.constructor = DeleteTool;


DeleteTool.prototype.activate = function(application) {
    this.setEventListener(application.canvas, 'click', this.deleteObject.bind(this, application));
}


DeleteTool.prototype.deleteObject = function(application, click_event) {
    let canvas_position = application.canvas.mousePositionToCanvasPosition(
        click_event.offsetX,
        click_event.offsetY
    );
    let object = application.canvas.getVertexOrEdgeOnPosition(application.graph, canvas_position);

    if (object instanceof Vertex)
        application.deleteVertex(object.id);
    else if (object instanceof Edge)
        application.deleteEdge(object.id);
    else
        return;

    application.redrawGraph();
}
