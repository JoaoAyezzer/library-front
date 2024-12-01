"use client";

import { CategoryList } from "@/src/components/category-list";
import { Button } from "@/src/components/ui/button";

export default function Category() {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div>Categorias</div>
        <Button>Cadastrar nova categoria</Button>
      </div>
      <CategoryList />
    </div>
  );
}
