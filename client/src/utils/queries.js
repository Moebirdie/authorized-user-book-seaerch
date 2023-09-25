import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      savedBooks
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
        _id
        username
        email
        savedBooks
     }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
        _id
        username
        email
        savedBooks
     }
  }
`;

export const QUERY_SAVEDBOOKS = gql`
  query getUserAndSavedBooks($username: String!) {
    user(username: $username) {
        _id
        username
        email
        savedBooks {
          _id
          authors
          description
          bookId
          image
          link
          title
        }
     }
  }
`;
