# Katana Technical Test
## Requirements
### Instructions
You are required to provide an implementation of REST API to simulate a deck of cards.

You need to provide a solution written in NodeJS Typescript. If you do not feel too comfortable with the language, it is OK to research a little
before starting writing the API. Feel free to use any NodeJS Typescript framework in the market or simply use a custom build.

The API should have the following methods to handle cards and decks:
- Create a new Deck
- Open a Deck
- Draw a Card


## tech Stack used
- Nest js
- TypeORM
- Swagger
- Postgresql
- Jest
- Docker
- GitHub Actions

## Running the Application

### Installation

```bash
$ npm install
```

### Running the app

```bash
# start a postgres DB
$ docker-compose -f .docker-compose/docker-compose.yml up -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### API Documentation

URL:
```bash
http://localhost:3000/api/
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database Migrations

```bash
# Create a new migration from entities
npm run typeorm migration:generate -- -n initialSchema -o

# Execute migrations 
npm run typeorm migration:run
```

## Pending
- Sort functionality in Open Deck function.
- Unit Tests.
- Integration Tests.
- Add Unit Test to Husky.
- Dockerize Application.
- Response DTO for OpenDeck and DrawCard.
- Deploy to Heroku.
