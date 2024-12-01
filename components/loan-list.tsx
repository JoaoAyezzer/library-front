"use client";

import { LoanResponse } from "@/models/loan";
import { loanService } from "@/services/loan-service";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function LoanList() {
  const [loans, setLoans] = useState<LoanResponse[]>([]);
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await loanService.getAllLoan();
        setLoans(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchLoans();
  }, []);

  return (
    <Table>
      <TableCaption>Lista de usuários</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Livro</TableHead>
          <TableHead>Usuário</TableHead>
          <TableHead>Emprestado em</TableHead>
          <TableHead>Alterado em</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Opções</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.map((loan) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{loan.bookTitle}</TableCell>
            <TableCell className="font-medium">{loan.userName}</TableCell>
            <TableCell className="font-medium">{loan.loanDate}</TableCell>
            <TableCell>{loan.updatedAt}</TableCell>
            <TableCell>{loan.status}</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
