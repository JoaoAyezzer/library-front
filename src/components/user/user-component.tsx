import { useEffect, useState } from "react";
import { userService } from "@/src/services/user-service";
import { UserResponse } from "@/src/models/user";
import { UserDrawer } from "./user-drawer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "@/src/components/ui/button";
import DialogAlert from "../dialog-alert";
import { toast } from "@/src/hooks/use-toast";

export default function UserComponent() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    fetchUsers();
  };

  const handleDrawerOpen = () => {
    setUserId(null);
    setIsDrawerOpen(true);
  };

  const onEditUser = (id: string) => {
    setUserId(id);
    setIsDrawerOpen(true);
  };

  const onDeleteUser = (id: string) => {
    userService
      .deleteById(id)
      .then(() => {
        toast({
          title: "Deletado",
          description: "Usuário deletado com sucesso",
        });
        fetchUsers();
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
        <h1>Usuários</h1>
        <Button onClick={() => handleDrawerOpen()}>Novo usuário</Button>
      </div>
      <UserDrawer
        triggerButton={<Button>Novo usuário</Button>}
        onClose={handleDrawerClose}
        isOpen={isDrawerOpen}
        userId={userId}
      />
      <Table>
        <TableCaption>Lista de usuários</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Alterado em</TableHead>
            <TableHead className="text-right">Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell className="font-medium">{user.phone}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>{user.updatedAt}</TableCell>
              <TableCell className="text-right">
                <Button className="mr-2" onClick={() => onEditUser(user.id)}>
                  Editar
                </Button>
                <DialogAlert
                  buttonTrigger={<Button variant="destructive">Deletar</Button>}
                  title="Deletar usuário"
                  description="Tem certeza que deseja deletar esse usuário?"
                  onConfirm={() => onDeleteUser(user.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
