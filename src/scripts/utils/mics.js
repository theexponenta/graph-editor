

export function objectHasOwnProperties(object, properties) {
    for (let property of properties) {
        if (!object.hasOwnProperty(property))
            return false;
    }
    
    return true;
}


export function downloadFile(filename, content_type, content) {
    let anchor = document.createElement('a');
    let file = new Blob([content], {"type": content_type});
    
    anchor.href = URL.createObjectURL(file);
    anchor.download = filename;

    anchor.click();
}


export function formatString(template, values) {
    let formatted = template;

    for (let key in values) {
        let regexp = new RegExp('\\{' + key + '\\}', 'gi');
        formatted = formatted.replace(regexp, values[key]);
    }

    return formatted;
}
