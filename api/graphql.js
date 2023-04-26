// graphql.js

import { createHandler } from 'graphql-http/lib/use/express'
import { schema, resolvers } from '../utils/graphql-defs.js'

const handler = createHandler({
  schema: schema,
  rootValue: resolvers,
})

export default handler
