const API_URL = 'http://localhost:3000/books'; 

// Helper function to make a fetch request
const fetchAPI = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed', error);
    throw error;
  }
};

// Fetch all books
export const getBooks = async () => {
  return fetchAPI(API_URL);
};

export const getBookById = async (id: string) => {
    return fetchAPI(`/api/books/${id}`);
  };
  

// Add a new book
export const addBook = async (bookData: any) => {
  return fetchAPI(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });
};

// Update a book by id
export const updateBook = async (id: string, bookData: any) => {
  return fetchAPI(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });
};

// Delete a book by id
export const deleteBook = async (id: string) => {
  return fetchAPI(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
