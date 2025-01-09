import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Box, Typography, Button, TextField } from '@mui/material';
import { Book } from '@/utils/types/types';
import RatingStars from './RatingStars';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface BookListProps {
  filteredBooks: Book[];
  handleViewDetails: (book: Book) => void;
  refetchBooks: () => void;
  handleAddBookToList: (book: Book) => Promise<void>;
}

const BookList: React.FC<BookListProps> = ({
  filteredBooks,
  handleViewDetails,
  refetchBooks,
}) => {
  const [isbn, setIsbn] = useState<string>('');
  const [bookData, setBookData] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [bookAdded, setBookAdded] = useState<boolean>(false);

  const mapToBook = (data: any): Book => ({
    title: data.title,
    author: data.authors ? data.authors[0]?.name : 'Unknown',
    isbn,
    readStatus: true,
    userRating: 4,
    notes: 'A must read classic book',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: data.id,
  });

  const fetchBookByISBN = async (isbn: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`,
      );
      if (!response.data || !response.data[`ISBN:${isbn}`]) {
        throw new Error('No book data found for the provided ISBN');
      }
      const book = mapToBook(response.data[`ISBN:${isbn}`]);
      setBookData(book);
    } catch (error) {
      console.error('Error fetching book data from Open Library API:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveBookToDatabase = async (book: Book) => {
    setSaveLoading(true);
    try {
      await axios.post('http://localhost:3000/books', book);
      toast.success('Book added successfully!');
      refetchBooks();
      setBookAdded(true);
    } catch (error) {
      console.error('Error saving the book to the database:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div>
      <Box sx={{ padding: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: { xs: 2, md: 4 },
          }}
        >
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <TextField
              label="Search by ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
            />
            <Button
              variant="contained"
              onClick={() => fetchBookByISBN(isbn)}
              disabled={loading}
              fullWidth
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </Box>
        </Box>

        {bookData && !bookAdded && (
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Book Found by ISBN:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 5,
                backgroundColor: '#f9f9f9',
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="body1">{bookData.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                Author: {bookData.author}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginRight: '5px' }}
                >
                  User Rating:
                </Typography>
                <RatingStars rating={bookData.userRating} />
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => saveBookToDatabase(bookData)}
                sx={{ marginTop: '20px' }}
                disabled={saveLoading}
              >
                {saveLoading ? 'Saving...' : 'Add to List'}
              </Button>
            </Box>
          </Box>
        )}

        <Grid container spacing={3}>
          {filteredBooks && filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Box
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                    backgroundColor: '#fff',
                    maxWidth: '280px',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '8px',
                      marginBottom: '16px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <MenuBookIcon sx={{ fontSize: '100px', color: 'grey' }} />
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: '600',
                      textAlign: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginTop: '8px',
                    }}
                  >
                    Author:
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ color: '#007bff', pl: '5px' }}
                    >
                      {book.author}
                    </Typography>
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '8px',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginTop: '8px',
                      }}
                    >
                      User Rating:
                    </Typography>
                    <RatingStars rating={book.userRating} />
                  </Box>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginTop: '8px',
                    }}
                  >
                    Notes
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ color: 'grey', pl: '5px' }}
                    >
                      {book.notes ? book.notes : 'No Notes'}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginTop: '8px',
                    }}
                  >
                    Status:
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ color: '#007bff', pl: '5px' }}
                    >
                      {book.readStatus ? 'Read' : 'Not Read'}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginTop: '8px',
                    }}
                  >
                    Created At:
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ color: 'grey', pl: '5px' }}
                    >
                      {new Date(
                        book.createdAt ?? new Date(),
                      ).toLocaleDateString()}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginTop: '8px',
                    }}
                  >
                    Updated At:
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ color: 'grey', pl: '5px' }}
                    >
                      {new Date(
                        book.updatedAt ?? new Date(),
                      ).toLocaleDateString()}
                    </Typography>
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '16px' }}
                    fullWidth
                    onClick={() => handleViewDetails(book)}
                  >
                    View Details
                  </Button>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ textAlign: 'center', width: '100%' }}
            >
              No books found.
            </Typography>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default BookList;
