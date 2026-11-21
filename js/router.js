const routes = {};      // Armazena as paginas registradas, associando cada caminho a sua funcao de renderizacao.

// Associa um caminho da hash a funcao responsavel por montar a pagina.
export function registerRouter(path, renderPage) {
    routes[path] = renderPage;
}

// Atualiza a hash da URL para carregar o caminho solicitado.
export function navigate(path) {
    window.location.hash = path;
}

// Inicializa o roteador e vincula a area da pagina onde o conteudo sera exibido.
export function startRouter(container) {

    async function render() {                               // Le a rota atual, encontra sua pagina e atualiza o conteudo da tela.

        const path = window.location.hash.slice(1) || "/";  // Remove o caractere "#" da hash; usa "/" quando nenhum caminho foi informado.
        const renderPage = routes[path] ?? routes["/"];     // Busca a pagina correspondente e usa a rota padrao caso ela nao exista.

        container.replaceChildren();                        // Remove o conteudo anterior antes de montar a nova pagina.
        await renderPage(container);

        window.scrollTo(0, 0);
    }

    // Executa render novamente sempre que a hash da URL mudar.
    window.addEventListener("hashchange", render);

    render();
}