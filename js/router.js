const routes = {};

export function registerRouter(path, renderPage) {
    routes[path] = renderPage;
}

export function navigate(path) {
    window.location.hash = path;
}

export function startRouter(container) {
    async function render() {
        const path = window.location.hash.slice(1) || "/";
        const renderPage = routes[path] ?? routes["/"];

        container.replaceChildren();
        await renderPage(container);
        window.scrollTo(0, 0);
    }

    window.addEventListener("hashchange", render);
    render();
}