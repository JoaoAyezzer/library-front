"use client";
import { userService } from "@/src/services/user-service";
import { UserResponse } from "@/src/models/user";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import Link from "next/link";
export type SelectUserDialogProps = {
  buttonTrigger: React.ReactNode;
};

export default function SelectUserPopover({
  buttonTrigger,
}: SelectUserDialogProps) {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
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

  return (
    <Popover>
      <PopoverTrigger asChild>{buttonTrigger}</PopoverTrigger>
      <PopoverContent side="left" className="w-auto">
        <div className="mb-2">
          <h2>Selecione um usuário para emprestar</h2>
        </div>
        <div className="flex flex-row">
          <Select onValueChange={(value) => setUserId(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o usuario" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Usuário</SelectLabel>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="ml-6">
            <Link href={`/loans/${userId}`}>Confirmar</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
