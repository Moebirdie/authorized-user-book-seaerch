import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SAVEDBOOKS = gql`
  mutation addSavedBooks($user_id:ID!, $bookId: String!) {
    addSavedBooks(userId: $user_id, savedBooks: $bookId) {
      _id
      authors
      description
      createdAt
      bookId
      image
      link
      title
      }
    }
`;

export const REMOVE_SAVEDBOOKS = gql`
  mutation removeSavedBooks($bookId: String!) {
    removeSavedBooks(savebooks: $bookId) {
      bookId
      }
    }
`;