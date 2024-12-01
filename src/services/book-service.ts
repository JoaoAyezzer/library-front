import { http } from "@/src/lib/http.config";
import { BookRequest, BookResponse } from "@/src/models/book";
import { AxiosResponse } from "axios";

class BookService {
  async createBook(data: BookRequest): Promise<AxiosResponse> {
    try {
      return await http.client.post<AxiosResponse>("/books", data);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
  async updateBook(id: string, data: BookRequest): Promise<AxiosResponse> {
    try {
      return await http.client.put<AxiosResponse>(`/books/${id}`, data);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }

  async deleteById(id: string): Promise<AxiosResponse> {
    try {
      return await http.client.delete<AxiosResponse>(`/books/${id}`);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
  async getAllBooks(): Promise<BookResponse[]> {
    try {
      const response = await http.client.get<BookResponse[]>("/books");
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }

  async getById(id: string): Promise<BookResponse> {
    try {
      const response = await http.client.get<BookResponse>(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
}

export const bookService = new BookService();
