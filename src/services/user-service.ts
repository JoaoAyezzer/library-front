import { http } from "@/src/lib/http.config";
import { UserRequest, UserResponse } from "@/src/models/user";
import { AxiosResponse } from "axios";

class UserService {
  async getAllUsers(): Promise<UserResponse[]> {
    try {
      const response = await http.client.get<UserResponse[]>("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }

  async getById(id: string): Promise<UserResponse> {
    try {
      const response = await http.client.get<UserResponse>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }

  async createUser(data: UserRequest): Promise<AxiosResponse> {
    try {
      const response = await http.client.post<AxiosResponse>("/users", data);
      return response;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
  async updateUser(id: string, data: UserRequest): Promise<AxiosResponse> {
    try {
      const response = await http.client.put<AxiosResponse>(
        `/users/${id}`,
        data
      );
      return response;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }

  async deleteById(id: string): Promise<AxiosResponse> {
    try {
      const response = await http.client.delete<AxiosResponse>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
}

export const userService = new UserService();
