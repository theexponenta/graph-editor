import {
    InvalidConfigurationParameterTypeError,
    MissingConfigurationParameterError
} from '../exceptions/StateMachineExceptions.js';


export function Transition(event_name, target_state, condition, action) {
    this.event_name = event_name;
    this.target_state = target_state;
    this.condition = condition;
    this.action = action;
}


Transition.prototype.checkCondition = function() {
    if (this.condition)
        return this.condition();

    return true;
}


Transition.prototype.performAction = function(...args) {
    if (this.action)
        this.action(...args);
}


Transition.create = function(event_name, object) {
    if (typeof object === 'string')
        return new Transition(event_name, object, null);
    
    if (!(object instanceof Object))
        throw new InvalidConfigurationParameterTypeError(
            'state.transitions.transition',
            'Object or String',
            typeof object
        );

    if (!object.hasOwnProperty('target'))
        throw new MissingConfigurationParameterError('state.transitions.transition.target');

    let target = object.target;
    if (typeof target !== 'string')
        throw new InvalidConfigurationParameterTypeError(
            'state.transitions.transition.target',
            'string',
            typeof object
        );

    let condition = object.condition || null;
    let action = object.action || null;
    
    return new Transition(event_name, target, condition, action);
}
