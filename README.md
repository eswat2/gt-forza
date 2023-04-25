# gt-forza

A prototype GraphQL server which uses the cars from Forza Horizon 5 (video game).  A technology demonstration leveraging the node microservices model provided by Vercel.

Underneath, the resolvers use 2 different mock servers:

- [mock-fh5][mock-fh5] - _a simple REST server with Forza Horizon 5 data_
- [mock-x43][mock-x43] - _a simple REST server with mock apis_

## dev

To try this locally, run the following:

1. `yarn`
2. `yarn start`


## graphql

> this version doesn't support a built-in playground...

Here's the current schema:

```
  type Query {
    solution: Solution
    cars: [GTForza]
    makes: [String]
    colors(count: Int!): [String]
    hash(count: Int!): [String]
    lorem(count: Int!): [String]
    slug(count: Int!): String
    uuid(count: Int!): [String]
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
```

## references

- [graphql-http][gqh-io] -- _Simple, pluggable, zero-dependency, GraphQL over HTTP spec compliant server, client and audit suite._
- [graphql-playground][gqp-io] -- _GraphQL IDE for better development workflows._

## who

- Richard Hess
- [eswat2.github.io][eswat2-io]



[eswat2-io]: https://eswat2.github.io
[gqh-io]: https://github.com/graphql/graphql-http
[gqp-io]: https://github.com/graphql/graphql-playground
[gql-io]: https://gt-forza.vercel.app/graphql
[mock-fh5]: https://mock-fh5.vercel.app/api
[mock-x43]: https://mock-x43.vercel.app/api


