import createStateMachine from '../../StateMachine/StateMachine.js';
import BaseTool from '../BaseTool.js';


export default function AddVertexTool() {
    let state_machine = createStateMachine({
        initial: 'idle',
        states: {
            idle: {
                transitions: {
                    canvasClick: {
                        target: 'idle',
                        action: this.addVertex
                    }
                }
            }
        }
    });

    BaseTool.call(this, "add_vertex", state_machine);
}


AddVertexTool.prototype = Object.create(BaseTool.prototype);
AddVertexTool.prototype.constructor = AddVertexTool;


AddVertexTool.prototype.addVertex = function(click_event, application) {
    let canvasPosition = application.canvas.mousePositionToCanvasPosition(click_event.offsetX, click_event.offsetY);
    application.addVertex(canvasPosition.x, canvasPosition.y);
}


AddVertexTool.prototype.activate = function(application) {
    this.setEventListener(application.canvas, 'click', 'canvasClick', application);
}
