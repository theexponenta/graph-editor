// Функции для работы с DOM-структурой конкретно самого приложения

import * as CommonDOMUtils from './common.js';


function getToolsTab(toolgroup_name) {
    return document.querySelector(`.toolbar__tools-tab[toolgroup-name="${toolgroup_name}"]`);
}


function getToolgroupTabButton(toolgroup_name) {
    return document.querySelector(`.toolbar__toolgroup-tab-button[toolgroup-name="${toolgroup_name}"]`);
}


function setAllToolgroupTabButtonsInactive() {
    let buttons = document.getElementsByClassName('toolbar__toolgroup-tab-button');
    for (let button of buttons)
        button.classList.remove("active");
}


export function resizeCanvas(canvas) {
    canvas.height = canvas.parentNode.clientHeight;
    canvas.width = canvas.parentNode.clientWidth;
}


export function setActiveToolgroupTabButton(toolgroup_name) {
    setAllToolgroupTabButtonsInactive();

    let button = getToolgroupTabButton(toolgroup_name);
    button.classList.add("active");
}


export function openToolsTab(toolgroup_name) {
    let tools_tab = getToolsTab(toolgroup_name);
    tools_tab.classList.add("active");   

    setActiveToolgroupTabButton(toolgroup_name); 
}


export function closeToolsTab(toolgroup_name) {
    let tools_tab = getToolsTab(toolgroup_name);
    tools_tab.classList.remove("active");

    setAllToolgroupTabButtonsInactive(); 
}


export function openOrCloseToolsTab(toolgroup_name) {
    let tools_tab = getToolsTab(toolgroup_name);
    let is_opened = tools_tab.classList.contains("active");

    if (is_opened)
        closeToolsTab(toolgroup_name);
    else
        openToolsTab(toolgroup_name);
}


function getToolButton(toolname) {
    return document.querySelector(`.tools-tab__tool-button[toolname="${toolname}"]`);
}


function setAllToolButtonsInactive() {
    let tool_buttons = document.getElementsByClassName('tools-tab__tool-button');
    for (let button of tool_buttons)
        button.classList.remove("active");
}


export function setActiveTool(toolname) {
    setAllToolButtonsInactive();

    let tool_button = getToolButton(toolname);
    tool_button.classList.add("active");
}
