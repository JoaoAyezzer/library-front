import LoanList from "@/src/components/loan-list";
import { Button } from "@/src/components/ui/button";

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
