import { BaseError } from './BaseError.js';


export class ObjectMissingSomeOfRequiredPropertiesError extends BaseError {
    constructor() {
        super("Object missing some of required properties");
    }
}

