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

export type { LoanResponse };
