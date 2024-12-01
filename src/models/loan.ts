interface LoanResponse {
  id: string;
  bookId: string;
  userId: string;
  bookTitle: string;
  userName: string;
  loanDate: string;
  returnDate: string;
  updatedAt: string;
  status: string;
}
interface LoanRequest {
  bookId: string;
  userId: string;
  returnDate: Date;
}
export type { LoanResponse, LoanRequest };
