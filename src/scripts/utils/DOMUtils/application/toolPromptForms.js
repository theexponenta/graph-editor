import * as common from './common.js';


export function getToolInputPromptForm(toolname) {
    return document.querySelector(`.tool-input-prompt-form[toolname="${toolname}"]`);
}


export function openToolInputPromptForm(toolname) {
    let tool_input_prompt_form = getToolInputPromptForm(toolname);
    common.makeElementActive(tool_input_prompt_form.parentNode);
}


export function closeToolInputPromptForm(toolname) {
    let tool_input_prompt_form = getToolInputPromptForm(toolname);
    common.makeElementInactive(tool_input_prompt_form.parentNode);
}


export function getToolInputPromptFormSubmitButton(toolname) {
    let tool_input_prompt_form = getToolInputPromptForm(toolname);
    return tool_input_prompt_form.querySelector(".tool-input-prompt-form__submit-button");
}


export function getToolInputPromptFormCloseButton(toolname) {
    let tool_input_prompt_form = getToolInputPromptForm(toolname);
    return tool_input_prompt_form.querySelector(".tool-input-prompt-form__close-button");
}
