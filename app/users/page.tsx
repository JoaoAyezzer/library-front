"use client";
import { Button } from "@/components/ui/button";
import UserList from "@/components/user-list";

export default function User() {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1>Usuários</h1>
        <Button>Cadastrar novo usuário</Button>
      </div>
      <UserList />
    </div>
  );
}
