import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import { ADD_SAVEDBOOKS, REMOVE_SAVEDBOOKS } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';


const SavedBooks = async () => {
  const [userData, setUserData] = useState([]);
const { loading, error, data } = useQuery(QUERY_ME);


  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const [removeSavedBook] = useMutation(REMOVE_SAVEDBOOKS);

  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await removeSavedBook({
        variables: { bookId },
      });
  
      setUserData(data.removeSavedBook.user);
    } catch (err) {
      console.error(err);
    }
  };

  const [addSavedBook] = useMutation(ADD_SAVEDBOOKS);

const handleAddBook = async () => {
  // const saveBookData = [addSavedBook] }

  try {
    const { data } = await addSavedBook({
      variables: { data },
    });

    setUserData(data.addSavedBook.user);
  } catch (err) {
    console.error(err);
  };
  //if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }
};
  return (
    <>
      <div fluid className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {data.me.savedBooks.length
            ? `Viewing ${data.me.savedBooks.length} saved ${data.me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {data.me.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
        }
export default SavedBooks;
