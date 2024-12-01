"use client";
import { useEffect, useState } from "react";
import BookCard from "./book-card";
import { bookService } from "@/src/services/book-service";
import { BookResponse } from "@/src/models/book";
import { Button } from "../ui/button";
import BookDrawer from "./book-drawer";

const BookComponent: React.FC = () => {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [bookId, setBookId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const fetchBooks = async () => {
    try {
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    fetchBooks();
  };
  const handleDrawerForCreate = () => {
    setBookId(null);
    setIsDrawerOpen(true);
  };
  const onEditBook = (id: string) => {
    setBookId(id);
    setIsDrawerOpen(true);
  };

  const handleBorrow = (bookId: string) => {
    console.log(`Borrow book with id: ${bookId}`);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-row justify-between">
        <h1>Livros</h1>
        <Button onClick={() => handleDrawerForCreate()}>
          Cadastrar novo livro
        </Button>
      </div>
      <BookDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        bookId={bookId}
      />
      <div className="max-h-80 w-full overflow-auto mt-8">
        <div className="grid grid-cols-3 gap-4 p-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={() => onEditBook(book.id)}
              onFetchBooks={() => fetchBooks()}
              onBorrow={() => handleBorrow(book.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookComponent;
