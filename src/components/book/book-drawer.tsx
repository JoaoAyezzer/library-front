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
import BookForm from "./book-form";

interface UserDrawerProps {
  bookId?: string | null;
  onClose: () => void;
  isOpen: boolean;
}

export default function BookDrawer({
  bookId,
  onClose,
  isOpen,
}: UserDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="flex flex-col">
        <div className="mx-auto w-full max-w-lg max-h-screen">
          <DrawerHeader>
            <DrawerTitle>
              {bookId ? "Editar livro" : "Formulário de novo livro"}
            </DrawerTitle>
            <DrawerDescription>
              {bookId
                ? "Atualize as informações do livro"
                : "Preencha o formulário para criar novo livro"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <BookForm bookId={bookId} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild className="w-full">
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
