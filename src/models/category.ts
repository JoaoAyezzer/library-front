interface CategoryResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryRequest {
  name: string;
}

export type { CategoryResponse, CategoryRequest };
