

export function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}


export function isPointInCircle(pointX, pointY, circleCenterX, circleCenterY, radius) {
    return distance(pointX, pointY, circleCenterX, circleCenterY) <= radius;
}
