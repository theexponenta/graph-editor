import CanvasFacade from "./CanvasFacade.js";


export default function GraphCanvasFacade(canvas_element) {
    CanvasFacade.call(this, canvas_element);
}

Object.setPrototypeOf(GraphCanvasFacade.prototype, CanvasFacade.prototype);
