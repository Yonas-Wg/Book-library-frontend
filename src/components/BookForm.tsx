import React from 'react';
import { useFormik } from 'formik';
import { Grid, TextField, Button } from '@mui/material';
import * as Yup from 'yup';

interface BookFormValues {
  title: string;
  author: string;
  isbn: string;
  readStatus: boolean;
}

interface Props {
  initialValues: BookFormValues;
  onSubmit: (values: BookFormValues) => void;
}

const BookForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      author: Yup.string().required('Author is required'),
      isbn: Yup.string()
        .required('ISBN is required')
        .matches(
          /^(97(8|9))?\d{9}(\d|X)$/,
          'Please enter a valid ISBN (10 or 13 digits)',
        ),
    }),
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="ISBN"
            name="isbn"
            value={formik.values.isbn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.isbn && Boolean(formik.errors.isbn)}
            helperText={formik.touched.isbn && formik.errors.isbn}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BookForm;
