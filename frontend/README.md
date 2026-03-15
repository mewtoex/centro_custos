Markdown
# 💻 Centro de Custos - Front-end (SPA)

Aplicação *Single Page Application* (SPA) desenvolvida em **React** e **TypeScript** para consumir a API de gestão financeira do Centro de Custos.

## 🛠️ Tecnologias Utilizadas

* **[React 18](https://react.dev/) + [Vite](https://vitejs.dev/):** Para uma renderização rápida e ambiente de desenvolvimento otimizado.
* **[TypeScript](https://www.typescriptlang.org/):** Garantindo a tipagem estática e interfaces baseadas nos DTOs da API.
* **[Tailwind CSS v3](https://tailwindcss.com/):** Estilização utilitária, garantindo um design responsivo e moderno sem arquivos CSS externos pesados.
* **[shadcn/ui](https://ui.shadcn.com/):** Coleção de componentes UI radiciais (Modais, Tabelas, Abas, Inputs) com acessibilidade nativa.
* **[Axios](https://axios-http.com/):** Cliente HTTP configurado com base URL para comunicação simplificada com o Back-end.
* **[Sonner](https://sonner.emilkowal.ski/):** Sistema elegante de notificações (Toasts) para exibir retornos de sucesso ou bloqueios de regras de negócio.

## 📂 Estrutura de Diretórios

A arquitetura de componentes foi desenhada para separar claramente os domínios da aplicação:

```text
src/
├── components/
│   ├── ui/           # Componentes base e reutilizáveis do shadcn/ui
│   ├── pessoas/      # Formulário e Listagem de Pessoas
│   ├── categorias/   # Formulário e Listagem de Categorias
│   ├── transacoes/   # Formulário e Listagem de Transações
│   └── dashboard/    # Componente analítico com tabelas de totais
│
├── services/
│   └── api.ts        # Instância global do Axios
│
├── App.tsx           # Ponto de entrada estruturando o layout da SPA (Header e Tabs)
└── index.css         # Variáveis globais do tema (Zinc) e diretivas do Tailwind
⚙️ Funcionalidades e UX
Layout SPA: Navegação fluida por abas (Tabs) sem recarregamento da página.

Modais (Dialogs): Formulários de cadastro e edição encapsulados em modais para preservar o contexto visual das tabelas de listagem.

Tratamento de Exceções: Captura em tempo real dos erros enviados pela API (ex: tentativa de registro de receita para menor de idade) e exibição amigável via Toasts.

Formatação Monetária: Utilização da API nativa Intl.NumberFormat para exibição correta de valores na moeda brasileira (R$).

🚀 Como rodar localmente
Certifique-se de que a API (Back-end) está em execução antes de testar a interface.

Bash
# Instale as dependências
npm install

# Inicie o ambiente de desenvolvimento
npm run dev
Abra http://localhost:5173 no seu navegador para ver o projeto.