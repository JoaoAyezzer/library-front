import LoanList from "@/components/loan-list";
import { Button } from "@/components/ui/button";

export default function Loan() {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1>Empréstimos</h1>
        <Button>Novo empréstimo</Button>
      </div>
      <LoanList />
    </div>
  );
}
