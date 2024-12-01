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
import { useEffect, useState } from "react";
import { toast } from "@/src/hooks/use-toast";
import { bookService } from "@/src/services/book-service";
import { Trash2, PlusCircle, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/src/lib/utils";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { CategoryResponse } from "@/src/models/category";
import { categoryService } from "@/src/services/category-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";

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
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

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

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
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
    const submitData = {
      ...values,
      isbns: values.isbns.map((isbn) => isbn.value),
      authors: values.authors.map((author) => author.value),
    };

    const submitAction = bookId
      ? bookService.updateBook(bookId, submitData)
      : bookService.createBook(submitData);

    submitAction
      .then(() => {
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
          description: error.response.data.message ?? "Erro ao salvar livro",
          variant: "destructive",
        });
      });
  }

  return (
    <ScrollArea className="rounded-md h-[500px] px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Livro</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="fetchCategoriesDigite o título do livro"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Nome completo do livro</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormItem>
            <FormLabel>ISBNs</FormLabel>
            <div className="space-y-2">
              {isbnFields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <FormControl className="flex-grow">
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
                className="w-full"
                onClick={() => appendIsbn({ value: "" })}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar ISBN
              </Button>
            </div>
            <FormDescription>ISBNs do livro</FormDescription>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Autores</FormLabel>
            <div className="space-y-2">
              {authorFields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <FormControl className="flex-grow">
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
                className="w-full"
                onClick={() => appendAuthor({ value: "" })}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Autor
              </Button>
            </div>
            <FormDescription>Autores do livro</FormDescription>
            <FormMessage />
          </FormItem>
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="publishedDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de publicação</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value instanceof Date &&
                          !isNaN(field.value.getTime()) ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Selecione a data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    informe a Data de publicação do livro
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecione uma categoria para o livro
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-2">
            <Button type="submit" className="w-full">
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}
