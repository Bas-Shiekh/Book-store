export interface AddBookInterface {
  title: string;
  description: string;
  price: number;
  publicationYear?: string;
  author?: string;
  category?: string;
}

export interface UpdateBookInterface {
  title?: string;
  description?: string;
  price?: number;
  publication_year?: number;
  author?: string;
  category?: string;
}

export interface AddBookQueryInterface {
  title: string;
  description: string;
  price: number;
  publication_year?: string;
  author?: string;
  category?: string;
  user_id: number;
}
