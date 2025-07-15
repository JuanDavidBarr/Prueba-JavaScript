import {renderRoute} from '../router.js';

const container = document.getElementById("container");
//gets the current path and the html tag where the content will be implemented
const handleRoute = () => renderRoute(location.hash, container);
//listens to a hash change
window.addEventListener("hashchange", handleRoute);
//listens to when the page has uploaded all html elements (execept for media)
window.addEventListener("DOMContentLoaded", handleRoute);