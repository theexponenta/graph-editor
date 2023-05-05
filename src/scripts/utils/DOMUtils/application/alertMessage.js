import { makeElementActive } from "./common";


function getAlertMessageElement() {
    return document.getElementById("alert-message");
}


export function setAlertMessage(message) {
    let alert_message_element = getAlertMessageElement();
    alert_message_element.innerText = message;
    makeElementActive(alert_message_element.parentNode);
}
