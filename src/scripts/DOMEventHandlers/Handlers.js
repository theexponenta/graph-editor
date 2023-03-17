import * as ApplicationDOMUtils from '../utils/DOMUtils/application.js';
import * as CommonDOMUtils from '../utils/DOMUtils/common.js';


export function toolgroupTabButtonClick(event) {
    let button = event.currentTarget;
    let toolgroup_name = button.getAttribute('toolgroup-name');
    
    ApplicationDOMUtils.openOrCloseToolsTab(toolgroup_name);
}


export function closeToolsTabButtonClick(event) {
    let button = event.currentTarget;
    let tools_tab = CommonDOMUtils.getAncestorMatchingSelector(button, ".toolbar__tools-tab");
    let toolgroup_name = tools_tab.getAttribute('toolgroup-name');

    ApplicationDOMUtils.closeToolsTab(toolgroup_name);
}


export function toolButtonClick(application, event) {
    let button = event.currentTarget;
    let toolname = button.getAttribute("toolname");

    ApplicationDOMUtils.setActiveTool(toolname);
    // в будущем тут будет что-то подобное: aplication.setTool(toolname)
}
