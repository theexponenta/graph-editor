import createStateMachine from '../../StateMachine/StateMachine.js';
import BaseTool from '../BaseTool.js';
import * as toolPromptFormsUtils from '../../utils/DOMUtils/application/toolPromptForms.js';
import { 
    makeElementActive,
    makeElementInactive
} from '../../utils/DOMUtils/application/common.js'


export default function AddEdgeTool() {
    let state_machine = createStateMachine({
        initial: 'selectFirstVertex',
        states: {
            selectFirstVertex: {
                onEnter: this.clear.bind(this),
                transitions: {
                    canvasClick: {
                        target: 'selectSecondVertex',
                        action: this.selectVertex.bind(this, 1),
                        postCondition: (() => this.vertex1 !== null).bind(this)
                    }
                }
            },
            selectSecondVertex: {
                transitions: {
                    canvasClick: {
                        target: 'enterEdgeData',
                        action: this.selectVertex.bind(this, 2),
                        postCondition: (() => this.vertex2 !== null).bind(this)
                    }
                }
            },
            enterEdgeData: {
                onEnter: this.openPromptForm.bind(this),
                transitions: {
                    formChanged: {
                        target: 'enterEdgeData',
                        action: this.hideOrShowWeightInput.bind(this)
                    },
                    submit: {
                        target: 'selectFirstVertex',
                        action: this.addEdge.bind(this)
                    },
                    cancel: 'selectFirstVertex'
                }
            }
        }
    });

    BaseTool.call(this, "add_edge", state_machine);
    this.vertex1 = null;
    this.vertex2 = null;
}


AddEdgeTool.prototype = Object.create(BaseTool.prototype);
AddEdgeTool.prototype.constructor = AddEdgeTool;


AddEdgeTool.prototype.activate = function(application) {
    this.setStateMachineEventListener(application.canvas, 'click', 'canvasClick', application);
    
    let input_prompt_form = toolPromptFormsUtils.getToolInputPromptForm(this.name);
    this.setStateMachineEventListener(input_prompt_form, 'submit', 'submit', application);
    this.setStateMachineEventListener(input_prompt_form, 'change', 'formChanged');

    let close_button = toolPromptFormsUtils.getToolInputPromptFormCloseButton(this.name);
    this.setStateMachineEventListener(close_button, 'click', 'cancel');
}


AddEdgeTool.prototype.selectVertex = function(vertex_index, click_event, application) {
    if (vertex_index != 1 && vertex_index != 2)
        throw new Error(`vertex_index must be 1 or 2, not ${vertex_index}`)

    let canvasMousePosition = application.canvas.mousePositionToCanvasPosition(
        click_event.offsetX,
        click_event.offsetY
    );

    let vertex = application.canvas.getVertexOnPosition(application.graph, canvasMousePosition);

    if (vertex) {
        this[`vertex${vertex_index}`] = vertex;
        vertex.highlight();
        application.redrawGraph();
    }
}


AddEdgeTool.prototype.openPromptForm = function() {
    toolPromptFormsUtils.openToolInputPromptForm(this.name);
} 


AddEdgeTool.prototype.addEdge = function(submit_event, application) {
    let form_data = new FormData(submit_event.target);
    let edge_has_weight = Boolean(Number(form_data.get('edge_has_weight')));
    let edge_oriented = Boolean(Number(form_data.get('edge_oriented')));
    let edge_weight = edge_has_weight ? parseFloat(form_data.get('edge_weight')) : null;

    application.addEdge(this.vertex1, this.vertex2, edge_oriented, edge_weight);
}


AddEdgeTool.prototype.hideOrShowWeightInput = function(change_event) {
    let target = change_event.target;
    if (target.name != "edge_has_weight")
        return;

    let value = Boolean(Number(target.value));
    let edge_weight_input = target.form.querySelector(`input[name="edge_weight"]`);
    if (value)
        makeElementActive(edge_weight_input);
    else
        makeElementInactive(edge_weight_input);
}


AddEdgeTool.prototype.clear = function() {
    if (this.vertex1) {
        this.vertex1.unhighlight();
        this.vertex1 = null;
    }
    
    if (this.vertex2) {
        this.vertex2.unhighlight();
        this.vertex2 = null;
    }
    
    toolPromptFormsUtils.closeToolInputPromptForm(this.name);
    application.redrawGraph();
}
