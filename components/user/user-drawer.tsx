"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import UserForm from "./user-form";

export function UserDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Novo usuário</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Formulário de novo usuario</DrawerTitle>
            <DrawerDescription>
              Preencha o formulario para criar novo usuário
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <UserForm />
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
