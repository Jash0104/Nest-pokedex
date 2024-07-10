<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

[NestJS](https://github.com/nestjs/nest) project, bulding a pokedex. NestJS + DockerCompose + MongoDB

## First Steps

1. Clone the respository
2. Execute
```bash
$ yarn install
```
3. Install Nest CLI
```bash
$ npm i -g @nestjs/cli
```
4. Raise the DB
```bash
$ docker-compose up -d
```
5. Execute to reconstruct DB with the seed
```bash
$ localhost:3000/api/v1/seed
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


## Stay in touch

- Author - [Juan Acosta](https://github.com/Jash0104)
- Another Project - [Poke Game](https://jash-poke-game.netlify.app/)
