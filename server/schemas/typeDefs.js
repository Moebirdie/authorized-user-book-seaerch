//example typedefs file
const typeDefs = `
type User {
  _id: ID
  username: String!
  email: String!
  password: String!
  savedBooks: [Book]
}

  type Book {
    _id: ID
    authors: [String]
    description: String!
    createdAt: String
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(username: String!): User
    savedBooks(username: String!): User   
    me(username: String!): Auth 
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSavedBooks(userId: ID!, bookId: String!): User
    removeSavedBooks(userId: ID!, bookId: String!): User
  }
`;

module.exports = typeDefs;
