[![Build Status](https://travis-ci.org/involvestecnologia/adoteonatal.svg?branch=master)](https://travis-ci.org/involvestecnologia/adoteonatal)
[![Code Climate](https://codeclimate.com/github/involvestecnologia/adoteonatal/badges/gpa.svg)](https://codeclimate.com/github/involvestecnologia/adoteonatal)
[![Issue Count](https://codeclimate.com/github/involvestecnologia/adoteonatal/badges/issue_count.svg)](https://codeclimate.com/github/involvestecnologia/adoteonatal)
[![Dependency Status](https://david-dm.org/involvestecnologia/adoteonatal/status.svg)](https://david-dm.org/involvestecnologia/adoteonatal#info=dependencies)
[![devDependency Status](https://david-dm.org/involvestecnologia/adoteonatal/dev-status.svg)](https://david-dm.org/involvestecnologia/adoteonatal#info=devDependencies)

# Adote o Natal
Be the Santa Claus who need.
We want to realize the desire of about 300 children from three institutions, from São Jose and Palhoça, municipalities of Santa Catarina.

We asked them what they would like to gain from the good old man and the answers are next to the pictures of each child.

--

Seja o Papai Noel de quem precisa.
Queremos realizar o desejo de cerca de 300 crianças de três instituições, de São Jose e Palhoça, municípios de Santa Catarina.

Perguntamos o que elas gostariam de ganhar do bom velhinho e as respostas estão junto às fotos de cada criança.

# App

Open Source Application for Donation Management

# Stack

- Express
- Vue.js
- MongoDB

# Setup
```bash
$ npm install yarn -g
$ yarn install
```
## Environment
1. Create an .env file based on the .env.example

* NODE_ENV
  - Node environment, defaults to `development`
* PORT
  - Http server port, defaults to `3000`
* HTTP_LOG_CONFIG
  - [morgan log configuration](https://github.com/expressjs/morgan#predefined-formats), defaults to `dev`
* DATABASE
  - `mongodb://` URL

## Usage
```bash
# start
$ yarn start

# test
yarn test

# coverage
yarn run coverage

# API docs
yarn run docs
```