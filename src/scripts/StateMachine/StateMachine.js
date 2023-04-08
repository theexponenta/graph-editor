import {
    MissingConfigurationParameterError,
    InvalidConfigurationParameterError,
    InvalidConfigurationParameterTypeError
} from '../exceptions/StateMachineExceptions.js';
import { State } from './State.js';


function checkStateTransitionsOrThrowError(states, state_to_check) {
    for (let transition of Object.values(state_to_check.transitions)) {
        if (!states.hasOwnProperty(transition.target_state))
            throw new InvalidConfigurationParameterError(
                'states.state.transitions.transition.target',
                `state "${transition.target_state}" does not exist`
            );
    }
}


function transformStatesToClassInstances(states) {
    let transformed_states = {};
    for (let state_name of Object.keys(states)) {
        let transformed_state = State.create(state_name, states[state_name]);
        checkStateTransitionsOrThrowError(states, transformed_state);
        transformed_states[state_name] = transformed_state;
    }

    return transformed_states;
}


export default function createStateMachine(configurationObject) {
    if (!configurationObject.hasOwnProperty('initial'))
        throw new MissingConfigurationParameterError("initial");

    if (!configurationObject.hasOwnProperty('states'))
        throw new MissingConfigurationParameterError("states");

    let states = configurationObject['states'];
    if (!(configurationObject['states'] instanceof Object))
        throw new InvalidConfigurationParameterTypeError('states', 'Object', typeof states);

    if (!states.hasOwnProperty(configurationObject['initial']))
        throw new InvalidConfigurationParameterError(
            'initial',
            'specified initial state does not exist'
        );

    states = transformStatesToClassInstances(states);

    return new StateMachine(states, configurationObject['initial']);
}


function StateMachine(states, initial_state) {
    this.states = states;
    this.current_state = initial_state;
}


StateMachine.prototype.event = function(event_name, ...args) {
    let transition = this.states[this.current_state].getTransition(event_name);
    if (!transition)
        return;

    if (!transition.checkPreCondition())
        return;

    transition.performAction(...args);

    if (!transition.checkPostCondition())
        return;

    let target_state = transition.target_state;
    this.states[this.current_state].exit();
    this.states[target_state].enter();
    this.current_state = target_state;
}
