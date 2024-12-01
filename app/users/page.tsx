"use client";
import { UserDrawer } from "@/components/user/user-drawer";
import UserList from "@/components/user/user-list";

export default function User() {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1>Usuários</h1>
        <UserDrawer />
      </div>
      <UserList />
    </div>
  );
}
