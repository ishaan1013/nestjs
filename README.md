<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Project Description

A Nest.js REST API following the MVC pattern, integrated with Prisma + PostgreSQL with Neon. Implements CRUD, rate limiting, logging, & exception filtering. Configured & deployed on Docker and Kubernetes. 

## Installation + Running

```bash
$ npm install
```

```bash
# development
$ npm run start

# Note: Create a database on Neon, and add in the required secrets to: /.env

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
