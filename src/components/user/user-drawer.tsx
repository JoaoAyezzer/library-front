"use client";

import * as React from "react";
import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/src/components/ui/drawer";
import UserForm from "./user-form";

interface UserDrawerProps {
  triggerButton: React.ReactNode;
  userId?: string;
  onClose: () => void;
  isOpen: boolean;
}

export function UserDrawer({ userId, onClose, isOpen }: UserDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {userId ? "Editar usuário" : "Formulário de novo usuário"}
            </DrawerTitle>
            <DrawerDescription>
              {userId
                ? "Atualize as informações do usuário"
                : "Preencha o formulário para criar novo usuário"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <UserForm userId={userId} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
