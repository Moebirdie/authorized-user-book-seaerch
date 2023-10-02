// String, Int, Float, ID, boolean
const typeDefs = `
type User {
  _id: ID
  username: String!
  email: String!
  savedBooks: [Book]
  bookCount: Int
}

  type Book {
    _id: ID
    authors: [String]
    description: String!
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
    users: [User]
    user(_id: ID!): User
    me: User 
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSavedBooks(bookId: String!): User
    removeSavedBooks(bookId: String!): User
  }

  input BookInput {
    authors: [String]!
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
  }

`;

module.exports = typeDefs;
