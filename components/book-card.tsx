import { BookResponse } from "@/models/book";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface BookCardProps {
  book: BookResponse;
  onBorrow: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book: { title, authors, publishedDate },
  onBorrow,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Publicado em: {publishedDate}</p>
        <p>Autores: {authors.join(", ")}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onBorrow}>Emprestar</Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
