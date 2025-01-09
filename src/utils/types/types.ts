export interface Book {
    id?: string;
    title: string;
    author: string;
    isbn: string;
    userRating: number; // Assuming user rating is between 1 and 5
    readStatus: boolean; // True for "Read", False for "Not Read"
    notes: string;
    createdAt?: string;
    updatedAt?: string;
  }
  