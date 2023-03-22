import { createStateMachine } from '../StateMachine/StateMachine.js';
import BaseTool from './BaseTool.js';


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

    BaseTool.call(this, state_machine);
}


Object.setPrototypeOf(AddVertexTool.prototype, BaseTool.prototype);


AddVertexTool.prototype.addVertex = function(click_event, application) {
    application.addVertex(click_event.offsetX, click_event.offsetY);
}


AddVertexTool.prototype.activate = function(application) {
    this.setEventListener(application.canvas, 'click', 'canvasClick', application);
}
