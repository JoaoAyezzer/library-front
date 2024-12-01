"use client";
import BookCard from "@/src/components/book/book-card";
import { LoanDrawer } from "@/src/components/loan/loan-drawer";
import { BookResponse } from "@/src/models/book";
import { bookService } from "@/src/services/book-service";
import { recommendedBooksService } from "@/src/services/recommended-books-service";
import { useEffect, useState } from "react";

export default function UserLoan({ params }: { params: { userId: string } }) {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<BookResponse[]>([]);

  const [bookId, setBookId] = useState<string>("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const fetchBooks = async () => {
    try {
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const data = await recommendedBooksService.getRecommendedBooks(
          params.userId
        );
        setRecommendedBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
    fetchRecommendedBooks();
  }, [params.userId]);

  const onClickBorrow = (id: string) => {
    setBookId(id);
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  return (
    <div className="flex flex-col gap-6">
      <h1>Livros recomendados para esse usuário</h1>
      <div>
        <div className="flex gap-4 overflow-x-auto">
          {recommendedBooks.length > 0 ? (
            recommendedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onBorrow={() => onClickBorrow(book.id)}
              />
            ))
          ) : (
            <h2>Nenhum livro recomendado</h2>
          )}
        </div>
      </div>
      <h1>Todos os livros</h1>
      <div className="flex gap-4 overflow-x-auto">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBorrow={() => onClickBorrow(book.id)}
          />
        ))}
      </div>
      <LoanDrawer
        isOpen={openDrawer}
        bookId={bookId}
        userId={params.userId}
        onClose={handleDrawerClose}
      />
    </div>
  );
}
