# Sistema de Comunidade para Discussão e Registro de Eventos Locais - InfoComunidade

Este projeto foi desenvolvido como parte da disciplina **CSI603 - Banco de Dados II** da **Universidade Federal de Ouro Preto (UFOP)**.  
📝 [Clique aqui](https://drive.google.com/drive/u/0/folders/13dW-tX_3Hf7p6N3QjynD8ijzJtkem2zU) para acessar a documentação completa da aplicação\
📽️ [Clique aqui](https://youtu.be/DvFmQglYjvw) para acessar o vídeo demonstrativo da aplicação 

---
## 📌 Descrição do Projeto
O sistema InfoComunidade é uma aplicação de comunidade que permite:

- Cadastro e gerenciamento de usuários.
- Criação, visualização, edição e exclusão de publicações (informativos e ocorrências).
- Inserção e leitura de comentários nas publicações.
- Registro e gestão de endereços associados aos usuários.
- Autenticação com login e controle de acesso.
- Carregamento automático de dados iniciais via JSON e filtros/paginação no frontend.

## 📊 Funcionalidades Principais

- 👤 **Usuário**
  - Cadastro e login.
  - Criação, visualização, edição e exclusão de publicações.
  - Inserção e leitura de comentários.
  - Cadastro e visualização de endereços.
  - Navegação e pesquisa pelas informações da comunidade.

## 🚀 Tecnologias Utilizadas

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

---
### 1. Clonar o repositório
## 🛠️ Como executar o projeto
```bash
git clone git@github.com:HalissonPiov/info-comunidade.git
```

### 2. Subir o banco de dados com Docker
`docker run --name infocomunidadedb -p 27018:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=1234 -d mongo:7`

### 🍃 URI para Conectar ao Banco com Software MongoDB Compass
`mongodb://admin:1234@localhost:27018/?authSource=admin`
- ⚠️ Deve estar com o banco de dados e a API rodando corretamente

O banco estará disponível em: **localhost:27018**

### 3. Executar o Backend

Acesse a pasta:

```bash
cd backend/src/main/java/com/ufop/bancodedados/infocomunidade
```

Coloque o arquivo **`InfocomunidadeApplication.java`** para executar.

O backend ficará disponível em: **http://localhost:8080**

---

### 4. Executar o Frontend

O frontend foi desenvolvido com **Angular 20**. Para iniciar:

Acesse a pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install           # ou npm i
```

Inicie o servidor de desenvolvimento:

```bash
ng serve              # usa o Angular CLI v20
```

A aplicação estará disponível em: **http://localhost:4200**

---

## 👨‍🏫 Créditos

Projeto desenvolvido para a disciplina **CSI603 - Banco de Dados II**  
**Professor:** Bruno Rabello Monteiro

**Alunos:**
- [Davi Abner Almeida Santiago](https://github.com/Davizitos57)
- [Hálisson Silveira Piovezana ](https://github.com/HalissonPiov)
- [Maria Clara Barbosa Fernandes](https://github.com/mclara831)
