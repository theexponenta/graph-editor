import CanvasFacade from "./CanvasFacade.js";


export default function GraphCanvasFacade(canvas_element) {
    CanvasFacade.call(this, canvas_element);
}

GraphCanvasFacade.prototype = Object.create(CanvasFacade.prototype);
GraphCanvasFacade.prototype.constructor = GraphCanvasFacade;
