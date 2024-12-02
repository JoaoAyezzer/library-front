"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { toast } from "@/src/hooks/use-toast";
import { CategoryResponse } from "@/src/models/category";
import { categoryService } from "@/src/services/category-service";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import CategoryDrawer from "./category-drawer";
import DialogAlert from "../dialog-alert";

export default function CategoryComponent() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    fetchCategories();
  };
  const handleDrawerForCreate = () => {
    setCategoryId(null);
    setIsDrawerOpen(true);
  };

  const onEditCategory = (id: string) => {
    setCategoryId(id);
    setIsDrawerOpen(true);
  };
  const onDeleteCategory = (id: string) => {
    categoryService
      .deleteById(id)
      .then(() => {
        toast({
          title: "Deletado",
          description: "Usuário deletado com sucesso",
        });
        fetchCategories();
      })
      .catch((error) => {
        toast({
          title: "Erro",
          description: error.response.data.message ?? "Erro ao deletar usuário",
        });
        console.error("Failed to delete user:", error);
      });
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <h1>Categorias</h1>
        <Button onClick={() => handleDrawerForCreate()}>Nova Categoria</Button>
      </div>
      <CategoryDrawer
        onClose={handleDrawerClose}
        isOpen={isDrawerOpen}
        categoryId={categoryId}
      />
      <Table>
        <TableCaption>Lista de categorias dos livros</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Atualizado em</TableHead>
            <TableHead className="text-right">Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.createdAt}</TableCell>
              <TableCell>{category.updatedAt}</TableCell>
              <TableCell className="text-right">
                <Button
                  className="mr-2"
                  onClick={() => onEditCategory(category.id)}
                >
                  Editar
                </Button>
                <DialogAlert
                  buttonTrigger={<Button variant="destructive">Deletar</Button>}
                  title="Deletar usuário"
                  description="Tem certeza que deseja deletar esse usuário?"
                  onConfirm={() => onDeleteCategory(category.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
