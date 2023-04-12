import Point from "../Canvas/Point";


export function distance(point1, point2) {
    return Math.sqrt(
        (point1.x - point2.x) * (point1.x - point2.x) +
        (point1.y - point2.y) * (point1.y - point2.y)
    );
}


export function isPointInCircle(point, circle_center_point, radius) {
    return distance(point, circle_center_point) <= radius;
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


export function isPointInRectangle(point, rectangle_top_left_point, width, height) {
    return point.x >= rectangle_top_left_point.x && point.x <= rectangle_top_left_point.x + width
           && point.y >= rectangle_top_left_point.y && point.y <= rectangle_top_left_point.y + height
}
