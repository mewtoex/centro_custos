# 💰 Centro de Custos - Sistema de Gestão Financeira


O repositório foi estruturado utilizando o padrão **Monorepo**, contendo o Back-end (API) e o Front-end (SPA) isolados em suas respectivas pastas.

## 🏗️ Arquitetura e Tecnologias

O projeto está dividido em duas frentes principais:

### Back-end (`/backend`)
* **Framework:** .NET 8 (C#) com ASP.NET Core Web API.
* **Banco de Dados:** Entity Framework Core.
* **Padrões:** Injeção de Dependência, Repository Pattern e Service Pattern (regras de negócio isoladas).
* **Testes:** xUnit, Moq e FluentAssertions para cobertura das regras de negócio.

### Front-end (`/frontend`)
* **Framework:** React 18 com TypeScript, inicializado via Vite.
* **Estilização e UI:** Tailwind CSS v3 e shadcn/ui (componentes acessíveis e modernos).
* **Comunicação:** Axios para consumo da API Rest.
* **Notificações:** Sonner (Toasts) para feedback visual ao usuário.

## 🎯 Regras de Negócio Implementadas

O sistema garante a integridade dos dados através das seguintes validações:

* **Deleção em Cascata:** Ao excluir uma Pessoa, todas as suas transações são automaticamente removidas do banco de dados.
* **Proteção de Menores:** Pessoas com idade inferior a 18 anos são bloqueadas de registrar transações do tipo "Receita" (apenas "Despesas" são permitidas).
* **Compatibilidade de Categoria:** Uma transação de "Despesa" não pode ser vinculada a uma categoria cuja finalidade seja exclusiva de "Receita" (e vice-versa).
* **Matemática Financeira:** O Dashboard calcula em tempo real o agrupamento de receitas e despesas por pessoa e categoria, além de exibir o Saldo Líquido Geral.

## 🚀 Como Executar o Projeto

Para testar a aplicação localmente, você precisará iniciar o Back-end e o Front-end simultaneamente.

1. **Iniciando a API (Back-end):**
   * Navegue até a pasta da API: `cd backend/CentoCusto.Api`
   * Restaure os pacotes: `dotnet restore`
   * Execute o projeto: `dotnet run`
   * *A API estará rodando em `http://localhost:5147`*

2. **Iniciando a Interface (Front-end):**
   * Abra um novo terminal e navegue até a pasta: `cd frontend`
   * Instale as dependências: `npm install`
   * Inicie o servidor de desenvolvimento: `npm run dev`
   * *Acesse no navegador: `http://localhost:5173`*

---
