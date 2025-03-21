import { Response } from "../response.interface";
interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}
interface ITodoService {
  getAll(): Promise<Todo[]>;
  create(title: string, description: string): Promise<void>;
  update(id: string, status: string): Promise<void>;
  delete(id: string): Promise<void>;
}
export type { ITodoService, Todo, Response };