import BaseTool from './BaseTool.js';
import createStateMachine from '../StateMachine/StateMachine.js';
import Vertex from '../Graph/Vertex/Vertex.js';
import CanvasFacade from '../Canvas/GraphCanvasFacade';


export default function MoveTool() {
    let state_machine = createStateMachine({
        initial: 'idle',
        states: {
            idle: {
                transitions: {
                    canvasMousedown: {
                        target: 'moving',
                        action: this.setMovingObject.bind(this)
                    }
                }
            },
            moving: {
                transitions: {
                    canvasMouseup: {
                        target: 'idle',
                        action: this.clear.bind(this),
                    },
                    canvasMousemove: {
                        target: 'moving',
                        action: this.move.bind(this)
                    }
                }
            }
        }
    });

    BaseTool.call(this, "move", state_machine);
    this.moving_object = null;
}


MoveTool.prototype = Object.create(BaseTool.prototype);
MoveTool.prototype.constructor = MoveTool;


MoveTool.prototype.activate = function(application) {
    this.setEventListener(application.canvas, 'mousedown', 'canvasMousedown', application);
    this.setEventListener(application.canvas, 'mouseup', 'canvasMouseup', application);
    this.setEventListener(application.canvas, 'mousemove', 'canvasMousemove', application);
}


MoveTool.prototype.setMovingObject = function(mousedown_event, application) {
    let canvasMousePosition = application.canvas.mousePositionToCanvasPosition(
        mousedown_event.offsetX,
        mousedown_event.offsetY
    );

    let vertex = application.canvas.getVertexOnPosition(
        application.graph,
        canvasMousePosition.x,
        canvasMousePosition.y
    );

    if (vertex) {
        this.moving_object = vertex;
        vertex.highlight();
    }
    else
        this.moving_object = application.canvas;
}


MoveTool.prototype.moveVertex = function(application, vertex, mousemove_event) {
    vertex.move(
        application.canvas.scaleCoordinate(mousemove_event.movementX),
        application.canvas.scaleCoordinate(mousemove_event.movementY)
    );
}


MoveTool.prototype.moveCanvas = function(canvas, mousemove_event) {
    canvas.incrementTranslateValues(
        mousemove_event.movementX,
        mousemove_event.movementY,
    );
}


MoveTool.prototype.move = function(mousemove_event, application) {
    if (this.moving_object instanceof CanvasFacade)
        this.moveCanvas(this.moving_object, mousemove_event);
    else if (this.moving_object instanceof Vertex)
        this.moveVertex(application, this.moving_object, mousemove_event);

    application.redrawGraph();
}


MoveTool.prototype.clear = function(mouseup_event, application) {
    if (this.moving_object instanceof Vertex) {
        this.moving_object.unhighlight();
        application.redrawGraph();
    }

    this.moving_object = null;
}
