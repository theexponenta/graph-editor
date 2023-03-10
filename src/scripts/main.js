import '../styles/main.css';
import {Application} from './Application.js';


document.addEventListener("DOMContentLoaded", () => {
    window.application = new Application();
    window.application.init();
});
