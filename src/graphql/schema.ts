import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Note {
    id: Int!
    title: String!
    body: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    notes: [Note!]!
    note(id: Int!): Note
  }

  type Mutation {
    createNote(title: String!, body: String!): Note!
    updateNote(id: Int!, title: String, body: String): Note
    deleteNote(id: Int!): Note
  }
`;
