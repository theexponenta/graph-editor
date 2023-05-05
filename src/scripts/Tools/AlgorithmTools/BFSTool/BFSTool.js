import BaseTool from '../../BaseTool.js';
import BFS from '../../../Graph/Algorithms/BFS.js';
import alert_message_template from './alertMessage.template';
import { formatString } from '../../../utils/mics.js';
import { setAlertMessage } from '../../../utils/DOMUtils/application/alertMessage.js';


export default function BFSTool() {
    BaseTool.call(this, "bfs", null);
    let traversal = null;
}


BFSTool.prototype = Object.create(BaseTool.prototype);
BFSTool.prototype.constructor = BFSTool;


BFSTool.prototype.activate = function(application) {
    this.setEventListener(application.canvas, 'click', this.execute.bind(this, application));
}


BFSTool.prototype.execute = function(application, click_event) {
    this.makeTraversal(application, click_event);
    this.showTraversalALertMessage();
    this.highlightTraversalVertices();
    application.redrawGraph();
    this.unhighlightTraversalVertices();
}


BFSTool.prototype.highlightTraversalVertices = function() {
    for (let bfs_vertex of this.traversal) {
        bfs_vertex.highlight();
    }
}


BFSTool.prototype.unhighlightTraversalVertices = function() {
    for (let bfs_vertex of this.traversal) {
        bfs_vertex.unhighlight();
    }
}


BFSTool.prototype.makeTraversal = function(application, click_event) {
    let canvas_position = application.canvas.mousePositionToCanvasPosition(
        click_event.offsetX,
        click_event.offsetY
    );
    let vertex = application.canvas.getVertexOnPosition(application.graph, canvas_position);
    if (!vertex)
        return;

    let bfs = new BFS(application.graph);
    this.traversal = bfs.traverse(vertex);
}


BFSTool.prototype.showTraversalALertMessage = function() {
    let traversal_string = this.traversal.map((vertex) => vertex.id).join(' ');
    setAlertMessage(formatString(alert_message_template, {"traversal": traversal_string}));
}

