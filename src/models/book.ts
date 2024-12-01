interface BookResponse {
  id: string;
  title: string;
  authors: string[];
  isbns: string[];
  publishedDate: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

interface BookRequest {
  title: string;
  isbns: string[];
  authors: string[];
  publishedDate: Date;
  categoryId: string;
}

export type { BookResponse, BookRequest };
