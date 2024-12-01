import { http } from "@/src/lib/http.config";
import { BookResponse } from "../models/book";
class RecommendedBooksService {
  async getRecommendedBooks(userId: string): Promise<BookResponse[]> {
    try {
      const response = await http.client.get<BookResponse[]>(
        `recommendations/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching recommended books:", error);
      throw error;
    }
  }
}

export const recommendedBooksService = new RecommendedBooksService();
