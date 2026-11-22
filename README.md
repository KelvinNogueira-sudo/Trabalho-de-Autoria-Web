# Checklist Trabalho de Autoria Web

### 1. Preparação do projeto

- [x] Criar a pasta do projeto e rodar `npm init -y`
- [x] Instalar o json-server: `npm install json-server`
- [x] Criar o `db.json` na raiz com pelo menos 5 a 8 cafés (campos: `id`, `title`, `description`, `ingredients[]`, `price`, `image`)
- [x] Rodar `npx json-server db.json` e testar `http://localhost:3000/cafes` no navegador
- [x] Testar também `http://localhost:3000/cafes/1`
- [x] Criar o `index.html` com apenas `<div id="root"></div>`, o link do Bootstrap (CSS) e o `<script type="module">`
- [x] Definir a estrutura de pastas, por exemplo:
    -  `js/api.js` (comunicação com a API)
    -  `js/cart.js` (gerenciamento do carrinho / localStorage)
    -  `js/dom.js` ou `js/views/` (criação de elementos)
    -  `js/router.js` (navegação entre páginas)
    -  `js/main.js` (ponto de entrada)

### 2. Módulo da API (`api.js`)

- [x] Função `getCafes()` com `fetch` GET em `/cafes`
- [x] Função `getCafeById(id)` (opcional, mas o enunciado cita o endpoint)
- [x] Tratar erro de rede (mostrar mensagem se a API estiver fora do ar)

### 3. Módulo do carrinho (`cart.js`)

- [x] Definir o formato salvo no localStorage, por exemplo `[{ id, title, price, quantity }]`
- [x] `getCart()`: lê e faz o parse do JSON (retorna `[]` se vazio)
- [x] `saveCart(cart)`: grava no localStorage
- [x] `addItem(cafe)`: adiciona ou incrementa a quantidade
- [x] `removeItem(id)`: decrementa e remove do carrinho quando chegar a 0
- [x] `getTotalItems()`: soma das quantidades (para o ícone)
- [x] `getTotalPrice()`: total acumulado
- [x] `clearCart()`: remove os dados (usado ao finalizar)

### 4. Estrutura comum (DOM e navegação)

- [x] Função utilitária para criar elementos (ex.: `createElement(tag, classes, texto)`)
- [x] Criar o **cabeçalho** com título/logo e o ícone de carrinho com o contador (badge)
- [x] Tornar o ícone clicável, levando ao carrinho
- [x] Implementar o roteador: limpa o conteúdo do `root` e renderiza a página correspondente
- [x] Garantir que o contador do cabeçalho atualize sempre que o carrinho mudar

### 5. Página inicial (Index)

- [x] Buscar os cafés com `getCafes()` ao carregar
- [x] Renderizar a lista em grid de cards do Bootstrap
- [x] Cada card mostra: **título, descrição, preço, imagem, ingredientes**
- [x] Botão “Adicionar ao carrinho” em cada card
- [x] Ao clicar, chamar `addItem` e atualizar o contador do cabeçalho
- [x] Mostrar estado de carregamento e mensagem de erro

### 6. Página do carrinho

- [x] Ler os itens do localStorage e renderizar a lista
- [x] Cada item mostra: **nome, preço, quantidade**
- [x] Botão **+** (adicionar unidade) e botão **−** (remover unidade)
- [x] Atualizar a tela (item, total e contador) após cada clique
- [x] Exibir o **total acumulado**
- [x] Tratar carrinho vazio (mensagem + link para voltar à loja, e desabilitar o “Finalizar Compra”)
- [x] Botão **“Finalizar Compra”** que leva à página de finalização

### 7. Página de finalização

- [x] Exibir os itens do carrinho e o total
- [x] Formulário com **endereço de entrega** (texto)
- [x] Campo de **método de pagamento** (select ou radio: cartão de crédito, boleto, PIX)
- [x] Botão **“Finalizar”**
- [x] **Validação:** endereço não vazio (e com tamanho mínimo razoável) e pagamento selecionado
- [x] Mostrar erros de validação ao usuário (classes `is-invalid` do Bootstrap)
- [x] Se válido: exibir **mensagem de confirmação** da compra
- [x] Chamar `clearCart()` e atualizar o contador do cabeçalho para 0
- [x] Oferecer botão para voltar à página inicial

### 8. Responsividade e visual (Bootstrap)

- [x] Incluir a meta tag viewport
- [x] Usar o grid do Bootstrap (`row`, `col-12 col-md-6 col-lg-4`) nos cards
- [ ] Testar em tamanho de celular (DevTools) nas 3 telas
- [ ] Imagens responsivas (`img-fluid` / `card-img-top`)
- [ ] Navbar adaptada para mobile

### 9. Revisão final (antes de entregar)

- [x] O HTML tem **somente** a `div#root` no body (além do script)
- [x] Todo o DOM é manipulado via `document` (sem frameworks)
- [x] O código está modularizado: DOM, API e carrinho em arquivos separados
- [x] O carrinho persiste ao recarregar a página e ao fechar/abrir o navegador
- [x] Fluxo completo testado: adicionar → ver carrinho → alterar quantidades → finalizar → carrinho zerado
- [x] Testar com a API desligada (o erro é tratado?)
- [ ] Incluir um `README` com os passos para rodar (`npm install`, `npx json-server db.json`, abrir o front, por exemplo com Live Server)
- [ ] Conferir o formato de entrega exigido pelo professor (zip, repositório etc.)
