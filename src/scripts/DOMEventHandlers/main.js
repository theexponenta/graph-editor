import * as Handlers from './Handlers.js'
import * as ApplicationDOMUtils from '../utils/DOMUtils/application.js';


function setToolgroupTabButtonClickHandlers() {
    let toolgroup_tab_buttons = document.getElementsByClassName("toolbar__toolgroup-tab-button");
    for (let button of toolgroup_tab_buttons)
        button.addEventListener("click", Handlers.toolgroupTabButtonClick);
}


function setCloseToolsTabButtonClickHandlers() {
    let close_tools_tab_buttons = document.getElementsByClassName("tools-tab__close-button");
    for (let button of close_tools_tab_buttons)
        button.addEventListener("click", Handlers.closeToolsTabButtonClick);
}


function setToolButtonClickHandlers(application) {
    let tool_buttons = document.getElementsByClassName("tools-tab__tool-button");
    let handler_function = Handlers.toolButtonClick.bind(this, application);

    for (let button of tool_buttons)
        button.addEventListener("click", handler_function);
}


function setResizeCanvasHandlers(application) {
    let handler_function = Handlers.resizeCanvas.bind(this, application);

    window.addEventListener('resize', handler_function);
    window.addEventListener('load', handler_function);
}


export default function setDOMEventHandlers(application) {
    setToolgroupTabButtonClickHandlers();
    setCloseToolsTabButtonClickHandlers();
    setToolButtonClickHandlers(application);
    setResizeCanvasHandlers(application);
    application.canvas.addEventListener('wheel', Handlers.scaleCanvas.bind(this, application));
}
