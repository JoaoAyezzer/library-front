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

export type { BookResponse };
