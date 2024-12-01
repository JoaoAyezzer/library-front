"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { categoryService } from "@/src/services/category-service";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome da categoria deve ter no mínimo 2 caracteres",
  }),
});
interface CategoryFormProps {
  categoryId?: string | null;
}
export default function CategoryForm({ categoryId }: CategoryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (categoryId) {
      const fetchCategory = async () => {
        try {
          const data = await categoryService.getById(categoryId);
          form.setValue("name", data.name);
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      };
      fetchCategory();
    }
  }, [form, categoryId]);

  function onToast(title: string, description: string) {
    toast({
      title: title,
      description: description,
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (categoryId) {
      categoryService
        .updateCategory(categoryId, values)
        .then((response) => {
          form.reset();
          if (response.status === 204) {
            onToast("Sucesso!", "Categoria atualizado com sucesso");
          }
        })
        .catch((error) => {
          onToast("Erro!", error.message);
        });
      return;
    }
    categoryService.createCategory(values).then((response) => {
      form.reset();
      if (response.status === 201) {
        onToast("Sucesso!", "Categoria criado com sucesso");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Fantasia" {...field} />
              </FormControl>
              <FormDescription>Nome da categoria de livro</FormDescription>
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
