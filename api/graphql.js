// graphql.js

import { createHandler } from 'graphql-http/lib/use/express'
import { schema, resolvers } from '../utils/graphql-defs.js'

const myHandler = createHandler({
  schema: schema,
  rootValue: resolvers,
})

export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  myHandler(req, res)
}
