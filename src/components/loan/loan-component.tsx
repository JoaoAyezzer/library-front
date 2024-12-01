"use client";

import { LoanResponse } from "@/src/models/loan";
import { loanService } from "@/src/services/loan-service";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import SelectUserPopover from "../select-user-popover";
import { Button } from "../ui/button";
import DialogAlert from "../dialog-alert";
import { toast } from "@/src/hooks/use-toast";

export default function LoanComponent() {
  const [loans, setLoans] = useState<LoanResponse[]>([]);

  const fetchLoans = async () => {
    try {
      const data = await loanService.getAllLoan();
      setLoans(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const onReturnLoan = (id: string) => {
    loanService
      .updateLoan(id)
      .then(() => {
        toast({
          title: "Devolvido",
          description: "O livro foi devolvido com sucesso",
        });
        fetchLoans();
      })
      .catch((error) => {
        toast({
          title: "Erro",
          description: error.response.data.message ?? "Erro ao devolver livro",
        });
        console.error("Failed to return loan:", error);
      });
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <h1>Empréstimos</h1>
        <SelectUserPopover buttonTrigger={<Button>Novo empréstimo</Button>} />
      </div>
      <Table>
        <TableCaption>Lista de empŕestimos</TableCaption>
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
              <TableCell className="text-right">
                <DialogAlert
                  disabled={loan.status.toLowerCase() === "entregue"}
                  buttonTrigger={<Button variant="outline">Devolver</Button>}
                  title="Devlolução de livro"
                  description="Tem certeza que deseja realizar a devlolução do livro?"
                  onConfirm={() => onReturnLoan(loan.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
