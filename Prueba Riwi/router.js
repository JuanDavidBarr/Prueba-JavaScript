//Aplies html and js from each view created by importing render and after render functions using the 'hash' content
const routes = {
    '/' : () => import('./views/eventsPage.js'),
    '/login' : () => import ('./views/login.js'),
    '/register' : () => import ('./views/register.js'),
    '/usersEvents' : () => import ('./views/usersEvents.js')
}
//takes information from routes elements, stores path inside a module so you can access to functions stored in each view (render(html), afterRender(js))
export async function renderRoute(hash, container) {
    const path = hash.slice(1) || '/';
    const load = routes[path];
    if(!load){
    container.innerHTML = `<h2>Not founded</h2>`
    return;    
    }
    const module = await load();
    const html = await module.render();
    container.innerHTML = html;
    if (typeof module.afterRender === 'function'){
        module.afterRender();
    }
}
