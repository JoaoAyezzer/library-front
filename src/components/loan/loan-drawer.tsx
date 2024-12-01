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
import { LoanForm } from "./loan-form";

interface LoanDrawerProps {
  userId: string;
  bookId: string;
  onClose?: () => void;
  isOpen: boolean;
}

export function LoanDrawer({
  userId,
  bookId,
  onClose,
  isOpen,
}: LoanDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Empréstimo</DrawerTitle>
            <DrawerDescription>
              Informe a data de devolução do livro
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <LoanForm userId={userId} bookId={bookId} />
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
