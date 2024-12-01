"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { UserResponse } from "@/models/user";
import { useEffect, useState } from "react";
import { userService } from "@/services/user-service";

export default function UserList() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Table>
      <TableCaption>Lista de usuários</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nome</TableHead>
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
            <TableCell className="text-right"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
