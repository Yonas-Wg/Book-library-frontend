  import { useState, useEffect } from 'react';
  import { getBooks } from '@/services/api';
  import { Container, Typography, Box, TextField, ListItemIcon, Drawer, List, ListItem, ListItemText, Divider, IconButton, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from '@mui/material';
  import BookList from '@/components/BookList';
  import { updateBook } from '@/services/api';
  import { Book } from '@/utils/types/types';
  import axios from 'axios';
  import MenuIcon from '@mui/icons-material/Menu';
  import { LibraryAdd, ViewList, LibraryBooks } from '@mui/icons-material';
  import { ToastContainer } from 'react-toastify';
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import AddBookForm from './books/add'; 
  import BookDetailsDrawer from '@/components/BookDetailsDrawer';

  const Home = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState('');
    const [openDrawer, setOpenDrawer] = useState(false);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false); 
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
      getBooks().then((booksData) => {
        setBooks(booksData);
        setFilteredBooks(booksData);
      });
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };

    useEffect(() => {
      const filtered = books?.filter((book) => {
        return (
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase()) ||
          book.isbn.includes(search)
        );
      });
      setFilteredBooks(filtered);
    }, [search, books]);

    const handleViewDetails = (book: Book) => {
      setCurrentBook(book);
      setIsEditMode(false);
      setOpenDrawer(true);
    };

    const handleEditBook = () => {
      setIsEditMode(true);
    };

    const handleDrawerClose = () => {
      setOpenDrawer(false);
      setCurrentBook(null);
    };

    const handleDeleteBook = async () => {
      if (!currentBook || !currentBook.id) {
        toast.error('No book selected for deletion.');
        return;
      }
    
      try {
        await axios.delete(`http://localhost:3000/books/${currentBook.id}`);
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== currentBook.id));
        setFilteredBooks((prevBooks) => prevBooks.filter((book) => book.id !== currentBook.id));
        toast.success('Book deleted successfully!');
        setOpenDrawer(false);
        setCurrentBook(null);
        closeDeleteDialog();
      } catch (error) {
        toast.error('Failed to delete the book. Please try again.');
      }
    };
      

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    const openDeleteDialog = () => setIsDeleteDialogOpen(true);
    const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

    const initialValues: Book = {
      title: '',
      author: '',
      isbn: '',
      userRating: 1,
      readStatus: true,
      notes: '',
    };

    const refetchBooks = () => {
      getBooks().then((booksData) => {
        setBooks(booksData);
        setFilteredBooks(booksData);
      });
    };
    
    const handleAddBookToList = async (book: Book) => {
      try {
        // Prevent adding duplicate books
        if (books.some(b => b.isbn === book.isbn)) {
          alert('This book already exists in the library');
          return;
        }
        await axios.post('/books', book);
        setBooks(prevBooks => [...prevBooks, book]);
        setFilteredBooks(prevBooks => [...prevBooks, book]);
      } catch (error) {
        console.error('Error adding book:', error);
      }
    };

    const handleSubmit = (updatedBook: Book) => {
      if (updatedBook.id) {
        updateBook(updatedBook.id, updatedBook)
          .then(() => {
            setBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
            setFilteredBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
            setOpenDrawer(false);
            setCurrentBook(null);
            refetchBooks();
            toast.success('Book updated successfully!');
          })
          .catch((error) => {
            console.error('Error updating book:', error);
          });
      } else {
        console.error('Book ID is missing');
      }
    };

    // Toggle Sidebar Drawer
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    

    return (
      <Box sx={{ display: 'flex' }}>
        <ToastContainer position="top-right" autoClose={5000} />

        {/* Sidebar Drawer */}
        <Drawer
  sx={{
    width: 210,
    flexShrink: 0,
    bgcolor: 'background.paper',
    '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
      bgcolor: '#f4f6f9',
    },
  }}
  variant={isSidebarOpen ? 'persistent' : 'temporary'} 
  anchor="left"
  open={isSidebarOpen}
>

          <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LibraryBooks sx={{ marginRight: 2 }} />
              <Typography variant="h6">PERSONAL BOOK LIBRARY</Typography>
            </Box>
            <Divider />
            <List>
              {/* Create Book ListItem */}
              <ListItem button sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={openDialog}>
                <ListItemIcon>
                  <LibraryAdd />
                </ListItemIcon>
                <ListItemText primary="Create Book" />
              </ListItem>

              {/* Books ListItem */}
              <ListItem button sx={{ fontWeight: 'bold', cursor: 'pointer' }}>
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <ListItemText primary="Books List" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            padding: 3,
          }}
        >
          {/* Sidebar toggle button (visible on mobile) */}
          <IconButton onClick={toggleSidebar} sx={{ mb: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h4">Books Library</Typography>
          <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <TextField
              label="Search by title, author, or ISBN"
              variant="outlined"
              fullWidth
              value={search}
              onChange={handleSearchChange}
            />
          </Box>

          {filteredBooks.length === 0 ? (
            <Typography>No books available</Typography>
          ) : (
            <BookList
              filteredBooks={filteredBooks}
              handleViewDetails={handleViewDetails}
              handleAddBookToList={handleAddBookToList}
              refetchBooks={refetchBooks}
            />
          )}

          {/* Book Details Drawer */}
          <BookDetailsDrawer
            currentBook={currentBook}
            isEditMode={isEditMode}
            handleEditBook={handleEditBook}
            handleSubmit={handleSubmit}
            handleDrawerClose={handleDrawerClose}
            openDeleteDialog={openDeleteDialog}
            refetchBooks={refetchBooks}
          />
        </Box>

        <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this book?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteBook}
              color='error'
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Book Dialog */}
        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogContent>
            <AddBookForm initialValues={initialValues} onSubmit={handleAddBookToList} closeDialog={closeDialog} refetch={refetchBooks} />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  export default Home;
