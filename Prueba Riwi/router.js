//Aplies html and js from each view created by importing render and after render functions using the 'hash' content
// const routes = {
//     '/' : () => import('./views/eventsPage'),
//     '/login' : () => import ('./views/login'),
//     '/register' : () => import ('./views/register')
// }

// export async function renderRoute(hash, container) {
//     const path = hash.slice(1) || '/';
//     const load = routes[path];
//     if(!load){
//     container.innerHTML = `<h2>Not founded</h2>`
//     return;    
//     }
//     const module = await load();
//     const html = await module.render();
//     container.innerHTML = html;
//     if (typeof module.afterRender === 'function'){
//         module.afterRender();
//     }
// }
