# gt-forza

A prototype GraphQL server which uses the cars from Forza Horizon 5 (video game).  A technology demonstration leveraging the node microservices model provided by ZEIT Now.

Underneath, the resolvers use 2 different mock servers:

- [mock-fh5][mock-fh5] - _a simple REST server with Forza Horizon 5 data_
- [mock-x43][mock-x43] - _a simple REST server with mock apis_

## dev

To try this locally, run the following:

1. `yarn`
2. `now dev`

The `now dev` command allows you to test the ZEIT Now app locally.

## graphql

- [/graphql][gql-io] - _the playground_

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

## who

- Richard Hess
- [eswat2.github.io][eswat2-io]



[eswat2-io]: https://eswat2.github.io
[gql-io]: https://gt-forza.vercel.app/graphql
[mock-fh5]: https://mock-fh5.vercel.app/api
[mock-x43]: https://mock-x43.vercel.app/api


