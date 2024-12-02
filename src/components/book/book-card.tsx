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
  deleteEnabled?: boolean;
  onEdit?: () => void;
  onFetchBooks?: () => void;
  onBorrow?: () => void;
}

export default function BookCard({
  book: { id, title, authors, publishedDate },
  deleteEnabled,
  onEdit,
  onFetchBooks,
  onBorrow,
}: BookCardProps) {
  const onDeleteBook = (id: string) => {
    bookService
      .deleteById(id)
      .then(() => {
        toast({
          title: "Deletado",
          description: "Livro deletado com sucesso",
        });
        if (onFetchBooks) onFetchBooks();
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
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Publicado em: {publishedDate}</p>
        <p>Autores: {authors.join(", ")}</p>
      </CardContent>
      <CardFooter className="justify-between">
        {onBorrow && <Button onClick={onBorrow}>Emprestar</Button>}
        {onEdit && (
          <Button variant="outline" onClick={onEdit}>
            Editar
          </Button>
        )}
        {deleteEnabled && (
          <DialogAlert
            buttonTrigger={<Button variant="destructive">Deletar</Button>}
            title="Deletar livro"
            description={`Tem certeza que deseja deletar o livro: ${title}?`}
            onConfirm={() => onDeleteBook(id)}
          />
        )}
      </CardFooter>
    </Card>
  );
}
