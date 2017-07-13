# adoteonatal
Sistema para ajudar na doação para crianças no Natal

# Stack

## Backend
- Express

## Frontend
- Vue.js
- Scss (BEM)

## Banco de Dados
- Mysql

### Setup
```bash
$ npm install yarn -g
$ yarn install
```
### Environment
* Basta criar um arquivo .env baseado no .env.example

* NODE_ENV
  - Node environment, defaults to `development`
* PORT
  - Http server port, defaults to `3000`
* HTTP_LOG_CONFIG
  - [morgan log configuration](https://github.com/expressjs/morgan#predefined-formats), defaults to `dev`
* DATABASE
  - `mongodb://` URL
* SECRET
  Application Secret
* KEY
  Application Key

### Usage
Start:
```bash
$ yarn start
```
Test:
```bash
$ yarn test
```
Coverage:
```bash
$ yarn run coverage
```

### License

[Licence](https://github.com/rodrigogs/express-seed/blob/master/LICENSE) © Rodrigo Gomes da Silva