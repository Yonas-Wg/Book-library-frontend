import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import BookForm from '../../components/BookForm';
import { getBookById, updateBook } from '../../services/api';

const BookDetails = ({ book }: { book: any }) => {
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    await updateBook(book.id, values);
    router.push('/');
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <BookForm initialValues={book} onSubmit={handleSubmit} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const book = await getBookById(params!.id as string);
  return { props: { book } };
};

export default BookDetails;
