import Point from "../Canvas/Point";


export function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}


export function isPointInCircle(pointX, pointY, circleCenterX, circleCenterY, radius) {
    return distance(pointX, pointY, circleCenterX, circleCenterY) <= radius;
}


export function rotatePoint(point, angle) {
    let sin_angle = Math.sin(angle);
    let cos_angle = Math.cos(angle);

    return new Point(
        point.x * cos_angle - point.y * sin_angle,
        point.y * cos_angle + point.x * sin_angle
    )
}


export function segmentCenter(point1, point2) {
    return new Point(
        (point1.x + point2.x) / 2,
        (point1.y + point2.y) / 2
    );
}
