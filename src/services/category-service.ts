import { http } from "@/src/lib/http.config";
import { CategoryRequest, CategoryResponse } from "@/src/models/category";
import { AxiosResponse } from "axios";

class CategoryService {
  async getById(id: string): Promise<CategoryResponse> {
    try {
      const response = await http.client.get<CategoryResponse>(
        `/categories/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  async createCategory(data: CategoryRequest): Promise<AxiosResponse> {
    try {
      return await http.client.post<AxiosResponse>("/categories", data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }
  async updateCategory(
    id: string,
    data: CategoryRequest
  ): Promise<AxiosResponse> {
    try {
      return await http.client.put<AxiosResponse>(`/categories/${id}`, data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }
  async deleteById(id: string): Promise<AxiosResponse> {
    try {
      return await http.client.delete<AxiosResponse>(`/categories/${id}`);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
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
