"use client";

import { toast } from "@/src/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/src/lib/utils";
import { Calendar } from "../ui/calendar";
import { useEffect } from "react";
import { loanService } from "@/src/services/loan-service";

const FormSchema = z.object({
  userId: z.string().uuid({
    message: "Id do usuário é obrigatório.",
  }),
  bookId: z.string().uuid({
    message: "Id do livro é obrigatório.",
  }),
  returnDate: z.date({
    message: "A data de devolução é obrigatória.",
  }),
});
interface LoanFormProps {
  userId: string;
  bookId: string;
}
export function LoanForm({ userId, bookId }: LoanFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    loanService
      .createLoan(data)
      .then(() => {
        toast({
          title: "Empréstimo realizado",
          description: "Livro emprestado com sucesso",
        });
      })
      .catch((error) => {
        toast({
          title: "Erro",
          description: error.response.data.message ?? "Erro ao emprestar livro",
        });
        console.error("Failed to loan book:", error);
      });
  }
  useEffect(() => {
    form.reset({
      userId,
      bookId,
    });
  }, [bookId, form, userId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="returnDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de devolução</FormLabel>
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
                      {field.value ? (
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
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Selecione a melhor data para devolução do livro
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Confirmar
        </Button>
      </form>
    </Form>
  );
}
