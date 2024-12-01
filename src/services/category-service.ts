import { http } from "@/src/lib/http.config";
import { CategoryResponse } from "@/src/models/category";

class CategoryService {
  async getAllCategories(): Promise<CategoryResponse[]> {
    try {
      const response = await http.client.get<CategoryResponse[]>("/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
}

export const categoryService = new CategoryService();
