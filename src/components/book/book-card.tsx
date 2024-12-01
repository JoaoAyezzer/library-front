"use client";
import { BookResponse } from "@/src/models/book";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DialogAlert from "../dialog-alert";
import { bookService } from "@/src/services/book-service";
import { toast } from "@/src/hooks/use-toast";

interface BookCardProps {
  book: BookResponse;
  onEdit: () => void;
  onFetchBooks: () => void;
  onBorrow: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book: { id, title, authors, publishedDate },
  onEdit,
  onFetchBooks,
  onBorrow,
}) => {
  const onDeleteBook = (id: string) => {
    bookService
      .deleteById(id)
      .then(() => {
        toast({
          title: "Deletado",
          description: "Livro deletado com sucesso",
        });
        onFetchBooks();
      })
      .catch((error) => {
        toast({
          title: "Erro",
          description: error.response.data.message ?? "Erro ao deletar livro",
        });
        console.error("Failed to delete book:", error);
      });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Publicado em: {publishedDate}</p>
        <p>Autores: {authors.join(", ")}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button onClick={onBorrow}>Emprestar</Button>
        <Button variant="outline" onClick={onEdit}>
          Editar
        </Button>
        <DialogAlert
          buttonTrigger={<Button variant="destructive">Deletar</Button>}
          title="Deletar livro"
          description={`Tem certeza que deseja deletar o livro: ${title}?`}
          onConfirm={() => onDeleteBook(id)}
        />
      </CardFooter>
    </Card>
  );
};

export default BookCard;
