// Максимально общие функции для работы с DOM
// Они не привязаны к DOM-структуре конкретно нашего приложения


export function getAncestorMatchingSelector(element, selector) {
    element = element.parentNode;
    while (!element.matches(selector) && element)
        element = element.parentNode;

    return element;
}
