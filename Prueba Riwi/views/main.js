import {renderRoute} from '../router.js';

const container = document.getElementById("container");

const handleRoute = () => renderRoute(location.hash, container);

window.addEventListener("hashchange", handleRoute);
window.addEventListener("DOMContentLoaded", handleRoute);