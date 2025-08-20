# API REST para Gerenciador de Tarefas com Spring Boot

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-brightgreen)

Este projeto é um estudo aprofundado na construção de uma API RESTful robusta e completa utilizando o ecossistema Spring. O foco principal foi a aplicação de conceitos essenciais do desenvolvimento back-end, incluindo a criação de uma arquitetura em camadas (Controller, Repository, Entity), persistência de dados com um banco de dados relacional e a exposição de endpoints CRUD seguindo as melhores práticas.

Para demonstrar e testar a funcionalidade da API, foi desenvolvido um cliente front-end minimalista em HTML, CSS e JavaScript puro, que consome todos os endpoints.

## 🚀 Funcionalidades da API

-   **CRUD Completo:** Operações para Criar, Ler, Atualizar e Deletar tarefas.
-   **Persistência de Dados:** Integração com PostgreSQL para garantir que os dados sejam permanentes.
-   **Arquitetura em Camadas:** Separação clara de responsabilidades.
-   **Respostas HTTP Semânticas:** Uso correto de códigos de status como `200 OK`, `201 Created`, `404 Not Found` e `204 No Content`.

## 🛠️ Tecnologias Principais (Back-end)

-   **Java 17**
-   **Spring Boot 3**
-   **Spring Web:** Para a construção de endpoints REST.
-   **Spring Data JPA:** Para a persistência e comunicação com o banco de dados.
-   **Hibernate:** Como implementação do JPA para o mapeamento objeto-relacional (ORM).
-   **PostgreSQL:** Banco de dados relacional principal.
-   **Maven:** Gerenciador de dependências do projeto.
-   **Spring Boot DevTools:** Para live-reload durante o desenvolvimento.

#### Cliente de Demonstração (Front-end)
-   **HTML5, CSS3 (Flexbox), JavaScript (ES6+)**

## ⚙️ Configuração e Execução da API (Back-end)

### Pré-requisitos
-   Java (JDK) 17 ou superior.
-   Maven 3.6 ou superior.
-   PostgreSQL instalado e rodando.

## Endpoints da API

| Método HTTP | Endpoint           | Descrição                       |
| :---------- | :----------------- | :------------------------------ |
| `GET`       | `/tarefas`         | Lista todas as tarefas.         |
| `GET`       | `/tarefas/{id}`    | Busca uma tarefa por ID.        |
| `POST`      | `/tarefas`         | Cria uma nova tarefa.           |
| `PUT`       | `/tarefas/{id}`    | Atualiza uma tarefa existente.  |
| `DELETE`    | `/tarefas/{id}`    | Deleta uma tarefa por ID.       |


## 👨‍💻 Autor

Projeto desenvolvido por **Felipe Matias** como parte de um estudo prático e guiado de desenvolvimento back-end.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/seu-usuario-linkedin/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seu-usuario)
---
