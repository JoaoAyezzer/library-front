"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { UserResponse } from "@/models/user";
import { userService } from "@/services/user-service";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome de usuário deve ter no mínimo 2 caracteres",
  }),
  email: z.string().email({
    message: "E-mail inválido",
  }),
  phone: z.string().min(10, {
    message: "Telefone deve ter no mínimo 10 caracteres",
  }),
});
interface UserFormProps {
  userId?: string;
}
export default function UserForm({ userId }: UserFormProps) {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchUsers = async () => {
        try {
          const data = await userService.getById(userId);
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      };

      fetchUsers();
    }
  }, [userId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    },
  });

  function onToast(title: string, description: string) {
    toast({
      title: title,
      description: description,
    });
  }
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (userId) {
      // Update user
      return;
    }
    userService.createUser(values).then((response) => {
      form.reset();
      if (response.status === 201) {
        onToast("Sucesso!", "Usuário criado com sucesso");
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="João Ayezzer" {...field} />
              </FormControl>
              <FormDescription>Nome do usuário</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="joao@gmail.com" {...field} />
              </FormControl>
              <FormDescription>Informe o e-mail do usuário</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="4499999999" {...field} />
              </FormControl>
              <FormDescription>Informe o telefone do usuário</FormDescription>
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
