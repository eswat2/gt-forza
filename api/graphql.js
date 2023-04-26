// graphql.js

import { createHandler } from 'graphql-http/lib/use/express'
import { allowCors } from '../utils/allow-cors.js'
import { schema, resolvers } from '../utils/graphql-defs.js'

const myHandler = createHandler({
  schema: schema,
  rootValue: resolvers,
})

export default allowCors(myHandler)
