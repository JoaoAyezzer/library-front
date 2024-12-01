import { http } from "@/lib/http.config";
import { LoanResponse } from "@/models/loan";

class LoanService {
  async getAllLoan(): Promise<LoanResponse[]> {
    try {
      const response = await http.client.get<LoanResponse[]>("/book-loans");
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }
}

export const loanService = new LoanService();
