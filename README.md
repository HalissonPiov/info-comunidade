# info-comunidade

### 🎲 Comando para Subir o Banco de Dados MongoDB:
`docker run --name infocomunidadedb -p 27018:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=1234 -d mongo:7`

### 🍃 URI para Conectar ao Banco com Software MongoDB Compass
`mongodb://admin:1234@localhost:27018/?authSource=admin`
- ⚠️ Deve estar com o banco de dados e a API rodando corretamente