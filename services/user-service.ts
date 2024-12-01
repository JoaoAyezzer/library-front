import { http } from "@/lib/http.config";
import { UserResponse } from "@/models/user";

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
}

export const userService = new UserService();
