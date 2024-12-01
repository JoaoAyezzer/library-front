import { http } from "@/src/lib/http.config";
import { LoanRequest, LoanResponse } from "@/src/models/loan";
import { AxiosResponse } from "axios";

class LoanService {
  async getAllLoan(): Promise<LoanResponse[]> {
    try {
      const response = await http.client.get<LoanResponse[]>("/book-loans");
      return response.data;
    } catch (error) {
      console.error("Error fetching book-loans:", error);
      throw error;
    }
  }
  async createLoan(data: LoanRequest): Promise<AxiosResponse> {
    try {
      return await http.client.post<AxiosResponse>("/book-loans", data);
    } catch (error) {
      console.error("Error fetching book-loans:", error);
      throw error;
    }
  }
}

export const loanService = new LoanService();
