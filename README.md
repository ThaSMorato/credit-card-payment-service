# Credit Card Payment Service

## Descrição

Este é um projeto para simular uma aplicação de pagamento com cartão de crédito. Ele validará números de cartão de crédito e sua data de expiração, além de processar um pagamento simulado.

## Tecnologias Utlizadas

O projeto utiliza as seguintes tecnologias:

- Node.js (v20.11.1)
- TypeScript
- Express.js
- Zod
- Prisma
- PostgreSQL
- Docker
- Vitest
- Supertest

## Requerimentos

Para rodar o projeto, você precisará ter instalado o Node.js (versão 20.11.1), o Docker ou um banco de dados PostgreSQL, além do npm ou pnpm, para a instalação de dependências.

## Instalação

Para instalar as dependências do projeto, clone o repositório e dentro da pasta do projeto, execute:

```cli
npm install
# ou
pnpm install
```

## Variáveis de Ambiente

O projeto requer a seguinte variáveis de ambiente que podem ser definidas através do arquivo .env:

- `ACCESS_TOKEN`: Código secreto para acessar as rotas da aplicação.
- `DATABASE_CONNECTION_URL`: URL de conexão com o banco de dados PostgreSQL.

## Execução Local

Para rodar a aplicação localmente, após instalação e configuração das variáveis de ambiente, use o comando:

```cli
npm run dev
# ou
pnpm run dev
```

## Execução com Docker

Para rodar a aplicação com Docker, use o comando:

```cli
docker-compose up
```

## Testes

Para rodar os testes unitários/integração, use o comando:

```cli
npm run test
# ou
pnpm run test
```

Para rodar os testes de ponta a ponta, use o comando:

```cli
npm run test:e2e
# ou
pnpm run test:e2e
```

## Rotas e Funcionalidades

### Rotas disponíveis na aplicação:

- [POST] /payments: Processa um pagamento simulado. Espera os seguintes dados no corpo da requisição:

```json
// exemplo
{
  "cvv": 123,
  "number": "1235 1255 2564 5542",
  "value": 15000,
  "validationDate": "12/35"
}
```

### Respostas da API

Os possíveis status de retorno da API:

- [201]: O pagamento foi realizado com sucesso.
- [400]: O cartão está expirado ou é inválido.
- [401]: Nen hum token de acesso foi fornecido.
- [403]: Token de acesso inválido.
- [409]: Cartão sem limite de crédito (fundos insuficientes).

## Banco de Dados

Este projeto utiliza PostgreSQL para persistência de dados. A URL de conexão com o banco de dados é controlada pela variável de ambiente `DATABASE_CONNECTION_URL`. Assegure-se de que o banco de dados esteja em execução e possa ser acessado pela aplicação.

## Acesso

Por questões de segurança e controle de acesso, todas as chamadas para a API backend devem incluir um token de acesso no header da solicitação, no campo `Authorization`.

## Client.http

Para testes manuais, o `client.http` trás exemplos de requisições

