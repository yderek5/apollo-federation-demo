
const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/federation");
const fetch = require('node-fetch');

const port = 4003;
// this is for the NestJS api
const apiUrl = "http://localhost:5000";

const typeDefs = gql`
  type Destination {
    id: ID!
    operations: [Mission]
    name: String!
    weather: String
  }

  extend type Mission @key(fields: "id") {
    id: ID! @external
    destinations: [Destination]
  }

  extend type Query {
    destination(id: ID!): Destination
    destinations: [Destination]
  }
`;

const resolvers = {
  Mission: {
    async destinations(mission) {
      const res = await fetch(`${apiUrl}/destinations`);
      const destinations = await res.json();

      return destinations.filter(({operations}) => operations.includes(parseInt(mission.id)));
    }
  },
  Destination: {
    operations(destination) {
      return destination.operations.map(id => ({__typename: "Mission", id}));
    }
  },
  Query: {
    destination(_, { id }) {
      return fetch(`${apiUrl}/destinations/${id}`).then(res => res.json());
    },

    destinations() {
      return fetch(`${apiUrl}/destinations`).then(res => res.json());
    }
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

server.listen({ port }).then(({ url }) => {
  console.log(`Destinations service ready at ${url}`);
});
