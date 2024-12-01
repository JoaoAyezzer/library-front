import { http } from "@/lib/http.config";
import { BookResponse } from "@/models/book";

class BookService {
  async getAllBooks(): Promise<BookResponse[]> {
    try {
      const response = await http.client.get<BookResponse[]>("/books");
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
}

export const bookService = new BookService();
