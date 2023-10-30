# bug-tracker

A small issue tracker similar to GitHub Issues.

## Setup

This project uses `yarn` which Node.js can setup when you run `corepack enable`. Run `yarn` to install all dependencies, setup `config.json`, then run `yarn build` to build the project, after which you can run `yarn start` to start the bug tracker. In development, you can use `yarn dev` to start the bug tracker with hot reloading instead of building the project entirely.

## Configuration

Configuration is done in `config.json`. Storage and authentication backends are selected in the following order if multiple backends are configured:

- Storage: MongoDB, Mock (only in development mode)
- Authentication: Mythic (Redis + @mythicmc/auth protocol), Redis, In-memory

```json
{
  "redisUrl": "",
  "mythicAuth": false,
  "mongoUrl": ""
}
```
