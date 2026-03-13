Markdown
# 💰 API Centro de Custos

Esta é a API (Back-end) do sistema de controle de gastos residenciais, desenvolvida como parte de um teste técnico. A aplicação foi construída visando alta qualidade de código, separação de responsabilidades e aderência estrita às regras de negócio solicitadas.

## 🛠 Tecnologias Utilizadas
* **C# .NET 8** (ASP.NET Core Web API)
* **Entity Framework Core 8** (ORM)
* **PostgreSQL** (Banco de Dados via Docker)
* **Swagger/OpenAPI** (Documentação da API)

## 🏛 Arquitetura e Padrões (Clean Code)
O projeto foi estruturado em camadas para garantir fácil manutenção e testes:
* **Models / Enums:** O coração da aplicação, contendo as entidades de domínio e mapeamentos do banco.
* **DTOs (Data Transfer Objects):** Camada de proteção que garante que a API receba e devolva apenas os dados estritamente necessários, evitando *Over-Posting*.
* **Repositories:** Isola completamente a lógica de acesso a dados (Entity Framework). As regras de negócio não conhecem o banco de dados.
* **Services:** Concentra todas as regras de negócio complexas exigidas no teste (ex: validação de idade, restrição de categorias por finalidade e cálculos de totais).
* **Controllers:** Camada fina de apresentação HTTP, responsável apenas por roteamento e retorno dos *Status Codes* adequados.

## ⚙️ Pré-requisitos
Para rodar este projeto, você precisará ter instalado em sua máquina:
* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* [Docker e Docker Compose](https://www.docker.com/)

## 🚀 Como executar o projeto localmente

**1. Subir o Banco de Dados:**
Na raiz do projeto (onde está o arquivo `docker-compose.yml`), execute:
```bash
docker-compose up -d
2. Criar as tabelas (Migrations):
Navegue até a pasta do projeto da API (CentoCusto.Api) e execute os comandos do Entity Framework para gerar as tabelas no PostgreSQL:

Bash
dotnet ef database update
3. Rodar a Aplicação:
Ainda na pasta do projeto, inicie a API:

Bash
dotnet run
A API estará disponível e a documentação interativa (Swagger) poderá ser acessada em:
http://localhost:5000/swagger ou https://localhost:5001/swagger (verifique a porta no terminal).

📋 Regras de Negócio Implementadas
Idade Mínima: Pessoas menores de 18 anos só podem registrar transações do tipo "Despesa".

Finalidade da Categoria: O sistema bloqueia transações caso o tipo da transação seja incompatível com a finalidade da categoria (ex: Registrar despesa em categoria de receita).

Exclusão em Cascata: Ao deletar uma Pessoa, todas as suas transações são apagadas automaticamente do banco de dados.

Relatórios: Agrupamento preciso de todas as receitas e despesas por pessoa e por categoria, incluindo o saldo líquido individual e geral.