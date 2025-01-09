import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { Edit, Close, Delete } from '@mui/icons-material';
import { Formik, Field, Form } from 'formik';
import { Book } from '@/utils/types/types';
import RatingStars from './RatingStars';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  isbn: Yup.string().required('ISBN is required'),
  userRating: Yup.number().required('User Rating is required').min(1).max(5),
  readStatus: Yup.string().required('Read Status is required'),
  notes: Yup.string().required('Notes are required'),
});

const BookDetailsDrawer = ({
  currentBook,
  isEditMode,
  handleEditBook,
  handleSubmit,
  handleDrawerClose,
  openDeleteDialog,
}: {
  currentBook: Book | null;
  isEditMode: boolean;
  handleEditBook: () => void;
  handleSubmit: (values: any) => void;
  handleDrawerClose: () => void;
  openDeleteDialog: () => void;
}) => (
  <Drawer
    anchor="right"
    open={!!currentBook}
    onClose={handleDrawerClose}
    sx={{
      '& .MuiDrawer-paper': {
        width: '100%',
        maxWidth: '400px', // Maximum width on larger screens
        padding: '20px',
        backgroundColor: '#f9f9f9',
        boxSizing: 'border-box',
      },
    }}
  >
    {currentBook && (
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {currentBook.title}
          </Typography>
          <Box>
            <IconButton onClick={handleDrawerClose}>
              <Close />
            </IconButton>
            <IconButton onClick={handleEditBook}>
              <Edit />
            </IconButton>
            <IconButton onClick={openDeleteDialog} sx={{ color: 'error.main' }}>
              <Delete />
            </IconButton>
          </Box>
        </Box>

        {isEditMode ? (
          <Formik
            initialValues={{
              id: currentBook?.id || '',
              title: currentBook.title || '',
              author: currentBook.author || '',
              isbn: currentBook.isbn || '',
              userRating: currentBook.userRating || 1,
              readStatus: currentBook.readStatus || '',
              notes: currentBook.notes || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ handleChange, handleBlur, values, touched, errors }) => (
              <Form>
                <Field
                  name="title"
                  as={TextField}
                  label="Title"
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title ? errors.title : ''}
                />
                <Field
                  name="author"
                  as={TextField}
                  label="Author"
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                  error={touched.author && Boolean(errors.author)}
                  helperText={
                    touched.author && errors.author ? errors.author : ''
                  }
                />
                <Field
                  name="isbn"
                  as={TextField}
                  label="ISBN"
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                  error={touched.isbn && Boolean(errors.isbn)}
                  helperText={touched.isbn && errors.isbn ? errors.isbn : ''}
                />
                <Field
                  name="userRating"
                  as={Select}
                  label="User Rating (1-5)"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userRating}
                  sx={{ marginBottom: '15px' }}
                  error={touched.userRating && Boolean(errors.userRating)}
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <MenuItem key={rating} value={rating}>
                      {rating}
                    </MenuItem>
                  ))}
                </Field>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.readStatus === true}
                      onChange={(e) => {
                        handleChange({
                          target: {
                            name: 'readStatus',
                            value: e.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Read"
                />

                <Field
                  name="notes"
                  as={TextField}
                  label="Notes"
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                  error={touched.notes && Boolean(errors.notes)}
                  helperText={touched.notes && errors.notes ? errors.notes : ''}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Update Book
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <Box>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              <strong>Author:</strong> {currentBook.author}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              <strong>ISBN:</strong> {currentBook.isbn}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              <strong>User Rating:</strong>{' '}
              <RatingStars rating={currentBook.userRating} />
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              <strong>Read Status:</strong>{' '}
              {currentBook.readStatus ? 'Read' : 'Not Read'}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              <strong>Notes:</strong> {currentBook.notes}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              <strong>Created At:</strong>{' '}
              {new Date(currentBook.createdAt ?? '').toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              <strong>Updated At:</strong>{' '}
              {new Date(currentBook.updatedAt ?? '').toLocaleDateString()}
            </Typography>
          </Box>
        )}
      </>
    )}
  </Drawer>
);

export default BookDetailsDrawer;
