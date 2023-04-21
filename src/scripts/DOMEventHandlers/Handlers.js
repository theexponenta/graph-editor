import * as toolbarUtils from '../utils/DOMUtils/application/toolbar.js';
import * as CommonDOMUtils from '../utils/DOMUtils/common.js';
import * as canvasStyles from '../Graph/canvasStyles.json';
import { tools } from '../Tools/tools.js';


export function toolgroupTabButtonClick(event) {
    let button = event.currentTarget;
    let toolgroup_name = button.getAttribute('toolgroup-name');
    toolbarUtils.openOrCloseToolsTab(toolgroup_name);
}


export function closeToolsTabButtonClick(event) {
    let button = event.currentTarget;
    let tools_tab = CommonDOMUtils.getAncestorMatchingSelector(button, ".toolbar__tools-tab");
    let toolgroup_name = tools_tab.getAttribute('toolgroup-name');

    toolbarUtils.closeToolsTab(toolgroup_name);
}


export function toolButtonClick(application, event) {
    let button = event.currentTarget;
    let toolname = button.getAttribute("toolname");
    let tool = new tools[toolname]();

    if (tool.single_action === false)
        toolbarUtils.setActiveTool(toolname);
    
    application.selectTool(tool);
}


export function resizeCanvas(application) {
    let canvas_element = application.canvas.canvasElement();
    application.canvas.resize(
        canvas_element.parentNode.clientWidth,
        canvas_element.parentNode.clientHeight
    );
    application.redrawGraph();
}


export function scaleCanvas(application, wheel_event) {
    let scale_factor = canvasStyles['scaling']['scaleFactor'];
    if (wheel_event.deltaY > 0)
        scale_factor = 1 / scale_factor;

    application.canvas.mouseRelativeScale(scale_factor, wheel_event.offsetX, wheel_event.offsetY);
    application.redrawGraph();
}
