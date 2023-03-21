import { BaseError } from './BaseError.js';


export class StateMachineError extends BaseError {
    constructor(message) {
        super(message);
    }
}


export class StateMachineConfigurationError extends StateMachineError {
    constructor(message) {
        super(message);
    }
}


export class MissingConfigurationParameterError extends StateMachineConfigurationError {
    constructor(parameter_name) {
        super(`Missing configuration parameter: ${parameter_name}`);
    }
}


export class InvalidConfigurationParameterError extends StateMachineConfigurationError {
    constructor(parameter_name, extra_message = null) {
        let message = `Invalid configuration parameter "${parameter_name}"`;
        if (extra_message)
            message += `: ${extra_message}`;
            
        super(message);
    }
}


export class InvalidConfigurationParameterTypeError extends InvalidConfigurationParameterError {
    constructor(parameter_name, expected_type, actual_type) {
        let extra_message = `This parameter must be of type ${expected_type}, but got an type ${actual_type}`;
        super(parameter_name, extra_message);
    }
}
