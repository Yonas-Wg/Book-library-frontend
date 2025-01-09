import { Formik, Form } from 'formik';
import { TextField, Button, Checkbox, FormControlLabel, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Book } from '@/utils/types/types';

interface AddBookFormProps {
  initialValues: Book;
  closeDialog: () => void;
  refetch: () => void;
}

// Yup validation schema
const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  author: Yup.string()
    .min(3, 'Author name must be at least 3 characters')
    .required('Author is required'),
  isbn: Yup.string()
    .matches(/^(97(8|9))?\d{9}(\d|X)$/, 'Invalid ISBN number')
    .required('ISBN is required'),
  userRating: Yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .required('Rating is required'),
  notes: Yup.string(),
});

const AddBookForm = ({ initialValues, closeDialog, refetch }: AddBookFormProps) => {
  const onSubmit = async (book: Book) => {
    try {
      const response = await axios.post('http://localhost:3000/books/manual', book);
      toast.success('Book added successfully');
      closeDialog();
      refetch();
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error('Failed to add the book. Please try again.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <TextField
            name="title"
            label="Book Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.title}
            onChange={handleChange}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title ? errors.title : ''}
          />
          <TextField
            name="author"
            label="Author"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.author}
            onChange={handleChange}
            error={touched.author && Boolean(errors.author)}
            helperText={touched.author && errors.author ? errors.author : ''}
          />
          <TextField
            name="isbn"
            label="ISBN"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.isbn}
            onChange={handleChange}
            error={touched.isbn && Boolean(errors.isbn)}
            helperText={touched.isbn && errors.isbn ? errors.isbn : ''}
          />
          <TextField
            name="userRating"
            label="User Rating"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={values.userRating}
            onChange={handleChange}
            error={touched.userRating && Boolean(errors.userRating)}
            helperText={touched.userRating && errors.userRating ? errors.userRating : ''}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="readStatus"
                checked={values.readStatus}
                onChange={handleChange}
              />
            }
            label="Read Status"
          />
          <TextField
            name="notes"
            label="Notes"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.notes}
            onChange={handleChange}
            multiline
            rows={4}
            error={touched.notes && Boolean(errors.notes)}
            helperText={touched.notes && errors.notes ? errors.notes : ''}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '16px',
            }}
          >
            <Button type="submit" variant="contained" color="primary">
              Add Book
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddBookForm;
