import * as Handlers from './Handlers.js'


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


function disableToolInputPromptFormsSubmit() {
    let prevent_default_function = (e) => e.preventDefault();
    let tool_input_prompt_forms = document.getElementsByClassName("tool-input-prompt-form");
    for (let tool_input_prompt_form of tool_input_prompt_forms)
        tool_input_prompt_form.addEventListener('submit', prevent_default_function);
}


function setSaveProgressEventHandlers(application) {
    let listener = application.saveToLocalStorage.bind(application);
    window.addEventListener('beforeunload', listener);
}


export default function setDOMEventHandlers(application) {
    setToolgroupTabButtonClickHandlers();
    setCloseToolsTabButtonClickHandlers();
    disableToolInputPromptFormsSubmit();
    setToolButtonClickHandlers(application);
    setResizeCanvasHandlers(application);
    setSaveProgressEventHandlers(application);
    application.canvas.addEventListener('wheel', Handlers.scaleCanvas.bind(this, application));
}
