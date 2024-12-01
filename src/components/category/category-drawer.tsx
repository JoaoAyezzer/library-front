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
import CategoryForm from "./category-form";

interface UserDrawerProps {
  categoryId?: string | null;
  onClose: () => void;
  isOpen: boolean;
}

export default function CategoryDrawer({
  categoryId,
  onClose,
  isOpen,
}: UserDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {categoryId ? "Editar Categoria" : "Formulário de nova categoria"}
            </DrawerTitle>
            <DrawerDescription>
              {categoryId
                ? "Atualize as informações da categoria"
                : "Preencha o formulário para criar nova categoria"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <CategoryForm categoryId={categoryId} />
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
