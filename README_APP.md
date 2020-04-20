[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)



## Sistemas opercionais suportados
- Linux
- MacOS

## Comando para instalar e iniciar a aplicação.
`````sh
$ ./install.sh
$ docker-compose up
`````

 O script install. sh instala o Docker. </br>
 O docker-compose up, baixa as imagens do nginx, elastic search e nodejs. Após isso, ele instala a aplicação conforme configurado no docker-compose.yml.


## Acesso a aplicação

- Endereço da aplicação WEB: http://localhost/
- URL totalizaçao dos Votos: http://localhost/api/survey
OBS: A aplicação inicia com 1 voto, apenas para fim de criar o indice.

## Arquitetura do Projeto
Descrição dos principais diretórios e arquivos
- /packages (diretório dos fontes da aplicação)
  - /cliente (diretório do front-end)
    - /src/componets (Componentes para poder ser reutilizados)
    - /src/store (Container dos estados da aplicação)
    - /src/views (Páginas renderizaveis)
    - Dockerfile (arquivo de configuração da imagem da aplicação)
  - /server (deretório do back-end)
    - /bin (Start e carga dos dados)
    - /src/controllers (Responsável pelas ações)
    - /src/models (Modelo dos objetos)
    - Dockerfile (arquivo de configuração da imagem da aplicação)
  - docker-compose.yml (responsável pela orquestração dos containers)
  - install.sh (responsável pela instalação do Docker)

## Modulos implementados
- API de obter enquete
- API Votar restringindo por data e hora de habilitação
- API Recaptcha 
- API total de geral votos
- API total por participante
- API total de votos por hora de cada paredão (falta implementar)
- Build automatizado
- Carga dados
-----------------------------------
- APP exibir enquete 
- APP habilitar votação por data e hora
- APP votar 
- APP feedback da votação
- APP Recaptcha 




## Bibliotecas utilizadas pela API:

- Babel: Responsável para converter o javascript para ser compativeis com browsers de versões anteriores.
- bluebird: Utilizado para trabalhar com promise
- body-parser: Faz o parse das requisições no middleware
- cors: É um pacote para fornecer um middleware Connect / Express que pode ser usado para ativar o CORS com várias opções.
- elasticsearch: Responsável pela conexão e manipulação do ElasticSearch
- express: Fornece recursos, disponibilizando métodos HTTP e middleware para criação de API.
- joi: API para descrição e validação de objetos JavaScript
- lodash: O Lodash torna o JavaScript mais fácil, eliminando o incômodo de trabalhar com matrizes, números, objetos, cadeias etc.
- moment: Biblioteca para trabalhar com data.
- morgan: API para logar as requisições no terminal
- shortid: Geração automática de UID.

## Bibliotecas utilizadas pelo frontend:

- react: É um framework para criação de componentes WEB.


## Esquema da base de dados

`````ts
interface Participante {
  id: string,
  nome: string,
  foto: string
}

interface Enquete {
  id: string,
  participantes: Array<Participante>,
  startedAt: number,
  finishedAt: number
}

interface Voto {
  enquete: Enquete,
  participante: Participante,
  createdAt: number
}
`````


``````json
GET /participante/:id

{
  "id": "a213ksa",
  "nome": "participante",
  "foto": "http://...."
}

------------

GET /votacao

{
  "id": "dsa123",
  "participantes": [
    "a213ksa",
    "da12dsa"
  ],
  "dataInicio": 1554145745,
  "dataFim": 1554145745
}

------------

POST /votacao

{
  "enquete": "dsa123",
  "participante": "a213ksa"
}

------------

GET /status/:votacao

{}
``````

## referencias

- https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html
- https://artillery.io/docs/getting-started/
- https://medium.com/@siddharthac6/elasticsearch-node-js-b16ea8bec427
- https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
- https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html
- https://www.sitepoint.com/search-engine-node-elasticsearch/
