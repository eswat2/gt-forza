// graphql-defs.js

import { buildSchema } from 'graphql'
import got from 'got'

const API_HOST = process.env.API_HOST
const FH5_HOST = process.env.FH5_HOST

console.log(API_HOST)
console.log(FH5_HOST)

// NOTE:  this seems convoluted...
const fetchApi = async (host, api, obj, callback) => {
  const keys = obj ? Object.keys(obj) : []
  const url = keys.reduce((glob, key, index) => {
    return `${glob}${index > 0 ? '&' : '?'}${key}=${obj[key]}`
  }, `${host}/api/${api}`)

  const data = await got(url).json()

  // NOTE:  once we have the data, pass it to the callback...
  callback && callback(data)
}

// GRAPHQL -------------------------------------------
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
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
`)

const promiseApi = (host, api, obj) => {
  return new Promise((resolve, reject) => {
    fetchApi(host, api, obj, (data) => {
      resolve(data)
    })
  })
}

// Provide resolver functions for your schema fields
const resolvers = {
  solution: ({ id }) => {
    return promiseApi(FH5_HOST, 'solution', { id })
  },
  cars: () => {
    return promiseApi(FH5_HOST, 'cars')
  },
  makes: () => {
    return promiseApi(FH5_HOST, 'makes')
  },
  colors: ({ count }) => {
    return promiseApi(FH5_HOST, 'colors', { count })
  },
  hash: ({ count }) => {
    return promiseApi(API_HOST, 'hash', { count })
  },
  lorem: ({ count }) => {
    return promiseApi(API_HOST, 'lorem', { count })
  },
  slug: ({ count }) => {
    return promiseApi(API_HOST, 'slug', { count })
  },
  uuid: ({ count }) => {
    return promiseApi(API_HOST, 'uuid', { count })
  },  
}

export { schema, resolvers }
