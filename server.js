// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express') // call express
require('ts-tiny-invariant')
const { ApolloServer, gql } = require('apollo-server-express')
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core')

const app = express() // define our app using express
const bodyParser = require('body-parser')
const axios = require('axios')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.use(express.static('public'))

// configure app to use CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

const port = process.env.PORT || 8080 // set our port

const API_HOST = process.env.API_HOST
const FH5_HOST = process.env.FH5_HOST

const fetchApi = (host, api, obj, callback) => {
  const keys = obj ? Object.keys(obj) : []
  const url = keys.reduce((glob, key, index) => {
    return `${glob}${index > 0 ? '&' : '?'}${key}=${obj[key]}`
  }, `${host}/api/${api}`)

  axios.get(url).then(({ data }) => {
    callback && callback(data)
  })
}

// GRAPHQL -------------------------------------------
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    solution(id: String = "42"): Solution
    cars: [GTForza]
    makes: [String]
    colors(count: Int = 4): [String]
    hash(count: Int = 4): [String]
    lorem(count: Int = 4): [String]
    slug(count: Int = 4): String
    uuid(count: Int = 4): [String]
  }

  type Solution {
    id: String
    data: DealerGroup
    summary: GroupSummary
  }

  type DealerGroup {
    dealers: [Dealer]
  }

  type Dealer {
    dealerId: String
    name: String
    vehicles: [Vehicle]
  }

  type GTForza {
    year: Int
    make: String
    model: String
  }

  type Vehicle {
    vin: String
    year: Int
    make: String
    model: String
    color: String
  }

  type GroupSummary {
    makes: [String]
    vins: [String]
    counts: GroupCounts
  }

  type GroupCounts {
    dealers: Int
    makes: Int
    vehicles: Int
  }
`

const promiseApi = (host, api, obj) => {
  return new Promise((resolve, reject) => {
    fetchApi(host, api, obj, (data) => {
      resolve(data)
    })
  })
}

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    solution: (obj, { id }) => {
      return promiseApi(FH5_HOST, 'solution', { id })
    },
    cars: () => {
      return promiseApi(FH5_HOST, 'cars')
    },
    makes: () => {
      return promiseApi(FH5_HOST, 'makes')
    },
    colors: (obj, { count }) => {
      return promiseApi(FH5_HOST, 'colors', { count })
    },
    hash: (obj, { count }) => {
      return promiseApi(API_HOST, 'hash', { count })
    },
    lorem: (obj, { count }) => {
      return promiseApi(API_HOST, 'lorem', { count })
    },
    slug: (obj, { count }) => {
      return promiseApi(API_HOST, 'slug', { count })
    },
    uuid: (obj, { count }) => {
      return promiseApi(API_HOST, 'uuid', { count })
    },
  },
}

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    introspection: true,
  })

  await server.start()

  server.applyMiddleware({ app })

  // REGISTER OUR ERROR HANDLERS -----------------------
  const logErrors = (err, req, res, next) => {
    console.log('-- ERROR')
    console.error(err.stack)
    next(err)
  }

  const errorHandler = (err, req, res, next) => {
    res.status(500).send({ error: 'Something failed!...' })
  }

  app.use(logErrors)
  app.use(errorHandler)

  // START THE SERVER
  // =============================================================================
  await new Promise((resolve) => app.listen({ port }, resolve))

  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
  return { server, app }
}

startApolloServer()
