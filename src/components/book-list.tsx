"use client";
import { useEffect, useState } from "react";
import BookCard from "./book-card";
import { bookService } from "@/src/services/book-service";
import { BookResponse } from "@/src/models/book";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<BookResponse[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookService.getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleBorrow = (bookId: string) => {
    console.log(`Borrow book with id: ${bookId}`);
  };

  return (
    <div className="max-h-80 w-full overflow-auto mt-10">
      <div className="grid grid-cols-3 gap-4 p-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBorrow={() => handleBorrow(book.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
