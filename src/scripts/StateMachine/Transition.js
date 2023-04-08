import {
    InvalidConfigurationParameterTypeError,
    MissingConfigurationParameterError
} from '../exceptions/StateMachineExceptions.js';


export function Transition(event_name, target_state, pre_condition, post_condition, action) {
    this.event_name = event_name;
    this.target_state = target_state;
    this.pre_condition = pre_condition;
    this.post_condition = post_condition;
    this.action = action;
}


Transition.prototype._checkCondition = function(condition) {
    if (condition)
        return condition();

    return true;
}


Transition.prototype.checkPreCondition = function() {
    return this._checkCondition(this.pre_condition);
}


Transition.prototype.checkPostCondition = function() {
    return this._checkCondition(this.post_condition);
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

    let pre_condition = object.preCondition || null;
    let post_condition = object.postCondition || null;
    let action = object.action || null;
    
    return new Transition(event_name, target, pre_condition, post_condition, action);
}
