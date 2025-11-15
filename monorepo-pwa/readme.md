# 🚀 Bootcamp PWA - Consulta Tabela FIPE

Projeto final do Bootcamp II, consistindo em um Progressive Web App (PWA) para consulta de veículos da Tabela FIPE. A aplicação utiliza uma arquitetura de microsserviços com um frontend em React (Vite) e um backend em Node.js (Express), orquestrados com Docker Compose e testados com Playwright.

---

## 👥 Equipe

* Matheus Henrique da Silva
* Maria Fernanda da silva nogueira
* Gustavo Henrique Vieira dos Santos

---

## 🛠️ Arquitetura do Projeto

O projeto segue uma estrutura de monorepo, contendo dois serviços principais:

* `apps/web`: O PWA (Frontend), construído com **React** e **Vite**. Ele é servido por um contêiner **Nginx** leve.
* `apps/api`: O Backend (API "BFF"), construído com **Node.js** e **Express**. Ele atua como um *proxy*, consumindo a API pública da Tabela FIPE de forma segura.



---

## 🏁 Como Rodar o Projeto (Localmente com Docker)

Este projeto é 100% containerizado. O único pré-requisito é ter o **Docker Desktop** instalado e rodando.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/mhsilvaworks/bootcamp-pwa-final.git](https://github.com/mhsilvaworks/bootcamp-pwa-final.git)
    cd bootcamp-pwa-final
    ```
    *(Lembre-se de trocar 'bootcamp-pwa-final' pelo nome do seu repositório)*

2.  **Suba os contêineres:**
    Na raiz do projeto (`monorepo-pwa`), execute o comando `docker-compose`:
    ```bash
    docker-compose up --build
    ```
    *(Isso pode demorar alguns minutos na primeira vez, pois ele precisa baixar as imagens e construir os dois serviços)*.

3.  **Acesse a aplicação:**
    Após o build terminar e os logs se estabilizarem, abra seu navegador e acesse:
    **[http://localhost:8080](http://localhost:8080)**

---

## 🧪 Como Rodar os Testes (E2E com Playwright)

Os testes de ponta-a-ponta (E2E) verificam o fluxo completo de interação do usuário.

1.  **Garanta que o aplicativo esteja rodando:**
    Os testes do Playwright precisam do aplicativo no ar. Deixe o `docker-compose up` (do passo anterior) rodando em um terminal.

2.  **Instale as dependências do Playwright (só na 1ª vez):**
    ```bash
    npm init playwright@latest
    ```
    *(Escolha JavaScript, `tests`, e 'false' para GitHub Actions)*

3.  **Execute os testes:**
    Em um **segundo terminal**, na raiz do projeto, rode:
    ```bash
    npx playwright test
    ```

4.  **Ver o relatório (Opcional):**
    ```bash
    npx playwright show-report
    ```

---

## 📋 Funcionalidades

* **PWA**: Aplicativo 100% instalável com suporte offline básico (via Service Worker e Manifest).
* **Consulta de Marcas**: O PWA busca a lista de marcas de carro do backend.
* **Consulta de Modelos**: Ao clicar em uma marca, o PWA busca dinamicamente a lista de modelos daquela marca.
* **API Proxy**: O backend esconde a complexidade e a URL da API pública, oferecendo endpoints simples (`/api/marcas`, `/api/modelos/:id`).