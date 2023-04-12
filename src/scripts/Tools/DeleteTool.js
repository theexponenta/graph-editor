import createStateMachine from '../StateMachine/StateMachine.js';
import BaseTool from './BaseTool.js';
import Vertex from '../Graph/Vertex/Vertex.js';
import Edge from '../Graph/Edge/Edge.js';


export default function DeleteTool() {
    let state_machine = createStateMachine({
        initial: 'idle',
        states: {
            idle: {
                transitions: {
                    canvasClick: {
                        target: 'idle',
                        action: this.deleteObject
                    }
                }
            }
        }
    });

    BaseTool.call(this, "delete", state_machine);
}


DeleteTool.prototype = Object.create(BaseTool.prototype);
DeleteTool.prototype.constructor = DeleteTool;


DeleteTool.prototype.activate = function(application) {
    this.setEventListener(application.canvas, 'click', 'canvasClick', application);
}


DeleteTool.prototype.deleteObject = function(click_event, application) {
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
