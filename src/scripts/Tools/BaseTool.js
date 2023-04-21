import { EventListenerInfo } from "./EventListenerInfo.js";


export default function BaseTool(name, state_machine=null, single_action=false) {
    this.name = name;
    this.state_machine = state_machine;
    this.event_listeners = [];
    this.single_action = single_action;
}


// метод назван setEventListener, чтобы не путать его
// со стандартным addEventListener
BaseTool.prototype.setEventListener = function (target, type, state_machine_event, ...args) {
    let self = this;
    let listener = (e) => self.state_machine.event(state_machine_event, e, ...args);

    target.addEventListener(type, listener);
    this.event_listeners.push(new EventListenerInfo(target, type, listener));
}


BaseTool.prototype.activate = function(application) {
    // этот метод должен переопределяться дочерними классами
    // он нужен для установки обработчиков и
    // для любых других инициализирующих действий
}


BaseTool.prototype._removeAllEventListeners = function() {
    for (let event_listener of this.event_listeners) {
        event_listener.target.removeEventListener(event_listener.type, event_listener.listener);
    }
}


BaseTool.prototype.deactivate = function() {
    this._removeAllEventListeners();
    // может быть дополнено дочерними классами
}
