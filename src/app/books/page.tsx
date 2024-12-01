import BookList from "@/src/components/book-list";
import { Button } from "@/src/components/ui/button";

export default function Book() {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1>Livros</h1>
        <Button>Cadastar novo livro</Button>
      </div>
      <BookList />
    </div>
  );
}
