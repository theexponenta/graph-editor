// Функции для работы с DOM-структурой конкретно самого приложения

import * as CommonDOMUtils from '../common.js';
import * as common from './common.js';


function getToolsTab(toolgroup_name) {
    return document.querySelector(`.toolbar__tools-tab[toolgroup-name="${toolgroup_name}"]`);
}


function getToolgroupTabButton(toolgroup_name) {
    return document.querySelector(`.toolbar__toolgroup-tab-button[toolgroup-name="${toolgroup_name}"]`);
}


function setAllToolgroupTabButtonsInactive() {
    let buttons = document.getElementsByClassName('toolbar__toolgroup-tab-button');
    common.makeElementsInactive(buttons);
}


export function setActiveToolgroupTabButton(toolgroup_name) {
    setAllToolgroupTabButtonsInactive();

    let button = getToolgroupTabButton(toolgroup_name);
    common.makeElementActive(button);
}


export function closeAllToolsTabs() {
    let tools_tabs = document.getElementsByClassName("toolbar__tools-tab");
    common.makeElementsInactive(tools_tabs);
}


export function openToolsTab(toolgroup_name) {
    let tools_tab = getToolsTab(toolgroup_name);
    common.makeElementActive(tools_tab);   

    setActiveToolgroupTabButton(toolgroup_name); 
}


export function closeToolsTab(toolgroup_name) {
    let tools_tab = getToolsTab(toolgroup_name);
    common.makeElementInactive(tools_tab);

    setAllToolgroupTabButtonsInactive(); 
}


export function openOrCloseToolsTab(toolgroup_name) {
    let tools_tab = getToolsTab(toolgroup_name);
    closeAllToolsTabs();
    common.makeElementActiveOrInactive(tools_tab);
}


function getToolButton(toolname) {
    return document.querySelector(`.tools-tab__tool-button[toolname="${toolname}"]`);
}


function setAllToolButtonsInactive() {
    let tool_buttons = document.getElementsByClassName('tools-tab__tool-button');
    common.makeElementsInactive(tool_buttons);
}


export function setActiveTool(toolname) {
    setAllToolButtonsInactive();

    let tool_button = getToolButton(toolname);
    common.makeElementActive(tool_button)
}
