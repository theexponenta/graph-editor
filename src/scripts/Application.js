import setDOMEventHandlers from './DOMEventHandlers/main';
import * as ApplicationDOMUtils from './utils/DOMUtils/application.js';


export function Application() {
    this.canvas = document.getElementById("canvas");
}


Application.prototype.init = function() {
    setDOMEventHandlers(this);
    ApplicationDOMUtils.resizeCanvas(this.canvas);
}
