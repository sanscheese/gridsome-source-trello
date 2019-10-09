# Trello source for Gridsome

> This package is under development and API might change before v1 is released.

## Install

- `yarn add @bhws/gridsome-source-trello`
- **OR** `npm install @bhws/gridsome-source-trello`

## Usage

Get your trello `key` and generate a `token` at [trello.com/app-key](https://trello.com/app-key)

```js
module.exports = {
  plugins: [
    {
      use: '@bhws/gridsome-source-trello',
      options: {
        boardId: 'TRELLO_BOARD_ID', // required
        key: process.env.GRIDSOME_TRELLO_KEY, // required
        token: process.env.GRIDSOME_TRELLO_TOKEN, // required
        typeNamePrefix: 'Trello',
      }
    }
  ],
  templates: {
    TrelloCard: '/card/:name',
    TrelloList: '/list/:name',
  }
}
```
