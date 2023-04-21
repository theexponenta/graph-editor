

export function objectHasOwnProperties(object, properties) {
    for (let property of properties) {
        if (!object.hasOwnProperty(property))
            return false;
    }
    
    return true;
}
