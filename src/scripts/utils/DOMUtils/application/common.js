
/*
Есть элементы, которые скрыты по умолчанию, но иногда их надо
показать. Либо есть инструменты, которые по умолчанию не выбраны,
а когда их выбирают, нужно, чтобы они как-то визуально отличались

Договоримся, что это все подобные действия будет делаться с помощью
добавления/удаления css-класса active. Будем использовать именно это
единственное слово, не будем разделять на selected (для чего-то что нужно "выбирать")
и shown (для чего-то, что нужно показать), чтобы не плодить одинаковый код
*/

export function makeElementActive(element) {
    element.classList.add("active");
}


export function makeElementInactive(element) {
    element.classList.remove("active");
}


export function makeElementsInactive(elements_collection) {
    for (let element of elements_collection)
        makeElementInactive(element);
}


export function makeElementActiveOrInactive(element) {
    let is_shown = element.classList.contains("active");

    if (is_shown)
        makeElementInactive(element);
    else
        makeElementActive(element);
}
