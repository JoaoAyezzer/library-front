"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useEffect } from "react";
import { toast } from "@/src/hooks/use-toast";
import { bookService } from "@/src/services/book-service";
import { Trash2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "O título do livro deve ter ao menos 2 caracteres",
  }),
  isbns: z
    .array(
      z.object({
        value: z
          .string()
          .min(10, { message: "ISBN deve ter pelo menos 10 caracteres" }),
      })
    )
    .min(1, { message: "Adicione pelo menos um ISBN" }),
  authors: z
    .array(
      z.object({
        value: z.string().min(2, {
          message: "O nome do autor deve conter ao menos 2 caracteres",
        }),
      })
    )
    .min(1, { message: "Adicione pelo menos um autor" }),
  publishedDate: z.date().max(new Date(), {
    message: "Data de publicação deve ser menor ou igual a data atual",
  }),
  categoryId: z.string().uuid({
    message: "Categoria inválida",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface BookFormProps {
  bookId?: string | null;
  onSubmitSuccess?: () => void;
}

export default function BookForm({ bookId, onSubmitSuccess }: BookFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      isbns: [{ value: "" }],
      authors: [{ value: "" }],
      publishedDate: new Date(),
      categoryId: "",
    },
  });

  const {
    fields: isbnFields,
    append: appendIsbn,
    remove: removeIsbn,
  } = useFieldArray({
    control: form.control,
    name: "isbns",
  });

  const {
    fields: authorFields,
    append: appendAuthor,
    remove: removeAuthor,
  } = useFieldArray({
    control: form.control,
    name: "authors",
  });

  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        try {
          const data = await bookService.getById(bookId);
          form.reset({
            title: data.title,
            isbns:
              data.isbns.length > 0
                ? data.isbns.map((isbn) => ({ value: isbn }))
                : [{ value: "" }],
            authors:
              data.authors.length > 0
                ? data.authors.map((author) => ({ value: author }))
                : [{ value: "" }],
            publishedDate: new Date(data.publishedDate),
            categoryId: data.categoryId,
          });
        } catch (error) {
          toast({
            title: "Erro",
            description: "Falha ao carregar dados do livro",
            variant: "destructive",
          });
          console.error("Failed to fetch book:", error);
        }
      };
      fetchBook();
    }
  }, [bookId, form]);

  function onSubmit(values: FormSchemaType) {
    // Transform the values to match the original service expectation
    const submitData = {
      ...values,
      isbns: values.isbns.map((isbn) => isbn.value),
      authors: values.authors.map((author) => author.value),
    };

    const submitAction = bookId
      ? bookService.updateBook(bookId, submitData)
      : bookService.createBook(submitData);

    submitAction
      .then((response) => {
        form.reset();
        const successMessage = bookId
          ? "Livro atualizado com sucesso"
          : "Livro criado com sucesso";

        toast({
          title: "Sucesso!",
          description: successMessage,
        });

        onSubmitSuccess?.();
      })
      .catch((error) => {
        toast({
          title: "Erro!",
          description: error.message,
          variant: "destructive",
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título do Livro</FormLabel>
              <FormControl>
                <Input placeholder="Digite o título do livro" {...field} />
              </FormControl>
              <FormDescription>Nome completo do livro</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>ISBNs</FormLabel>
          {isbnFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <FormControl>
                <Input
                  placeholder="ISBN"
                  {...form.register(`isbns.${index}.value`)}
                />
              </FormControl>
              {isbnFields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeIsbn(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => appendIsbn({ value: "" })}
          >
            Adicionar ISBN
          </Button>
          <FormDescription>ISBNs do livro</FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Autores</FormLabel>
          {authorFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <FormControl>
                <Input
                  placeholder="Nome do autor"
                  {...form.register(`authors.${index}.value`)}
                />
              </FormControl>
              {authorFields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeAuthor(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => appendAuthor({ value: "" })}
          >
            Adicionar Autor
          </Button>
          <FormDescription>Autores do livro</FormDescription>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="publishedDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Publicação</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={field.value}
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormDescription>Data de publicação do livro</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
