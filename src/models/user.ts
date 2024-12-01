interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

interface UserRequest {
  name: string;
  email: string;
  phone: string;
}

export type { UserResponse, UserRequest };
