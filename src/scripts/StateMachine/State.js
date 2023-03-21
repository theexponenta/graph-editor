import {
    MissingConfigurationParameterError,
    InvalidConfigurationParameterTypeError
} from '../exceptions/StateMachineExceptions.js';
import { Transition } from './Transition.js';


function transformTransitionsToClassInstances(transitions) {
    let transformed_transitions = {};
    for (let event_name of Object.keys(transitions)) {
        let transformed_transition = Transition.create(event_name, transitions[event_name]);
        transformed_transitions[event_name] = transformed_transition;
    }

    return transformed_transitions;
}


export function State(id, on_enter, on_exit, transitions) {
    this.id = id;
    this.on_enter = on_enter;
    this.on_exit = on_exit;
    this.transitions = transitions;
}


State.create = function (id, object) {
    let on_enter = null;
    let on_exit = null;
    
    if (object.hasOwnProperty('onEnter'))
        on_enter = object['onEnter'];

    if (object.hasOwnProperty('onExit'))
        on_exit = object['onExit'];

    if (!object.hasOwnProperty('transitions'))
        throw new MissingConfigurationParameterError("state.transitions");

    let transitions = object['transitions'];
    if (!(transitions instanceof Object))
        throw new InvalidConfigurationParameterTypeError('state.transitions', 'Object', typeof transitions);
    
    transitions = transformTransitionsToClassInstances(transitions);
    
    return new State(id, on_enter, on_exit, transitions);
}


State.prototype.getTransition = function(event_name) {
    if (this.transitions.hasOwnProperty(event_name))
        return this.transitions[event_name];

    return null;
}


State.prototype.enter = function() {
    if (this.on_enter)
        this.on_enter();
}


State.prototype.exit = function() {
    if (this.on_exit)
        this.on_exit();
}

