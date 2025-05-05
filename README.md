# 🗂️ API REST de Gerenciamento de Tarefas em C#

Este projeto é uma API RESTful criada utilizando **ASP.NET Core** para gerenciar tarefas. Ele conta com operações CRUD básicas (Criar, Ler, Atualizar e Deletar), além de **filtragem de tarefas por status** (Pendente, Em Progresso, Concluída), seguindo **arquitetura em camadas**, princípios de **Clean Code**, e padrões **Result** e **Service** aplicados.

---

## ✅ Funcionalidades

A API permite:

- Criar uma nova tarefa
- Listar todas as tarefas ou uma tarefa específica pelo ID
- Atualizar uma tarefa existente
- Deletar uma tarefa
- Filtrar tarefas por status (`Pendente`, `EmProgresso`, `Concluída`)

### 📌 Cada tarefa possui os seguintes campos:

- `Id` (int, auto incrementado)
- `Título` (string, obrigatório, máximo 100 caracteres)
- `Descrição` (string, opcional)
- `Data de Criação` (DateTime, gerado automaticamente)
- `Data de Conclusão` (DateTime?, opcional, não pode ser anterior à Data de Criação)
- `Status` (enum: Pendente, EmProgresso, Concluída)

---

## 🛠️ Tecnologias Utilizadas

### 🔧 Backend
- ASP.NET Core
- C#
- Entity Framework Core
- SQL Server

### 🎨 Frontend
- JavaScript
- HTML
- CSS

---

## 🧱 Arquitetura em Camadas

O projeto está organizado em camadas visando separação de responsabilidades e facilidade de manutenção:

- **Domain**: Entidades e regras de negócio
- **Application**: Interfaces e serviços de aplicação
- **Infrastructure**: Comunicação com o banco de dados
- **Presentation (API)**: Controllers da API

---

## 🧼 Clean Code Aplicado

- **Nomeação Clara**: Métodos e variáveis autoexplicativas
- **Métodos Pequenos**: Foco em responsabilidades únicas
- **SRP** (Single Responsibility Principle)
- **Princípios SOLID** aplicados
- **Tratamento de Erros**: Retorno adequado com códigos HTTP:
  - `400`: Erros de validação
  - `404`: Recurso não encontrado
  - `500`: Erros internos do servidor

---

## ⚙️ Configuração do Projeto Localmente

### 📋 Pré-requisitos

- [.NET Core SDK](https://dotnet.microsoft.com/en-us/download)
- [SQL Server](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads) (ou SQL Server Express)
- [Azure Data Studio](https://learn.microsoft.com/pt-br/sql/azure-data-studio/download) ou [SSMS](https://learn.microsoft.com/pt-br/sql/ssms/download-sql-server-management-studio-ssms) (opcional)

### 💾 Configuração do Banco de Dados

1. Crie um banco de dados no SQL Server (ex: `TarefasDB`)
2. Atualize a string de conexão no arquivo `appsettings.json`

### 🔁 Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

---

## ▶️ Executando a Aplicação

1. Navegue até o diretório do projeto (onde está o `.csproj`)
2. Restaure as dependências:

```bash
dotnet restore
```

3. Rode a API:

```bash
dotnet run
```

A API estará disponível em: `http://localhost:<porta>`

---

## 🧪 Executando Testes

Se houver testes implementados:

1. Vá até o diretório do projeto de testes
2. Restaure (se necessário):

```bash
dotnet restore
```

3. Execute os testes:

```bash
dotnet test
```

---

## 🗄️ Banco de Dados

- **SGBD**: SQL Server
- **ORM**: Entity Framework Core
- **Configuração**: via `appsettings.json`

---

## 🌐 Endpoints da API

| Método | Rota                          | Descrição                                     |
|--------|-------------------------------|-----------------------------------------------|
| POST   | `/api/tarefas`                | Cria uma nova tarefa                          |
| GET    | `/api/tarefas`                | Lista todas as tarefas                        |
| GET    | `/api/tarefas/{id:int}`       | Busca uma tarefa específica por ID            |
| GET    | `/api/tarefas/status/{status}`| Lista tarefas por status                      |
| PUT    | `/api/tarefas/{id}`           | Atualiza uma tarefa existente                 |
| DELETE | `/api/tarefas/{id}`           | Remove uma tarefa                             |

---

## ✔️ Validações

- Título é obrigatório (máximo 100 caracteres)
- Data de Conclusão não pode ser anterior à Data de Criação

---

## ⚠️ Tratamento de Erros

| Código | Descrição                         |
|--------|-----------------------------------|
| 200    | OK – Requisição bem-sucedida      |
| 400    | Bad Request – Erro de validação   |
| 404    | Not Found – Recurso não encontrado|
| 500    | Internal Server Error – Erro no servidor |

---

## 📌 Observações

Este README fornece um guia básico para configurar, executar e utilizar a API **TaskControl**.  
A documentação detalhada da API pode ser acessada via Swagger em:

```
http://localhost:<porta>/swagger
```
