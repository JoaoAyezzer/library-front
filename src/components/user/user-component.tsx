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

  const handleEditUser = (id: string) => {
    setUserId(id);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1>Usuários</h1>
        <Button onClick={() => setIsDrawerOpen(true)}>Novo usuário</Button>
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
                <Button onClick={() => handleEditUser(user.id)}>Editar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
