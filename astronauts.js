
const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/federation");
const fetch = require('node-fetch');

const port = 4001;
const apiUrl = "http://localhost:3000";

const typeDefs = gql`
  type Astronaut @key(fields: "id") {
    id: ID!
    name: String
  }

  extend type Query {
    astronaut(id: ID!): Astronaut
    astronauts: [Astronaut]
  }
`;

const resolvers = {
  Query: {
    astronaut(_, { id }) {
      return fetch(`${apiUrl}/astronauts/${id}`).then(res => res.json());
    },

    astronauts() {
      return fetch(`${apiUrl}/astronauts`).then(res => res.json());
    }
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

server.listen({ port }).then(({ url }) => {
  console.log(`Astronauts service ready at ${url}`);
});
