# Clash of clans API

A easy way to interact with COC api, with Typescript Intellisense in responses.

# Requisites

You will need a Clash of Clans API Token. You can get one [here](https://developer.clashofclans.com)

# Installation

Using npm:
`npm install --save coc-api`
Using yarn:
`yarn install coc-api`

# Usage

## Initialize

Import the module.
Using import:
`import { cocApi } from "coc-api"`

Using CommonJS:
`const cocApi = require("coc-api")`

Initialize a instance of coc-api
`const client = new cocApi({ token: "your-token" })`
