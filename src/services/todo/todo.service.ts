import { ITodoService, Response, Todo } from "./todo.interface";
import { axiosClient } from "../../client";
import { AuthService } from "../auth/auth.service";

export class TodoService implements ITodoService {
  private _baseUrl: string = import.meta.env.VITE_TODO_URL;
  constructor(private readonly authService: AuthService) { }
  async getAll(): Promise<Todo[]> {
    const token = this.authService.getToken();
    if (!this._baseUrl) throw new Error('Auth url not set');
    if (!token) throw new Error('No token found');
    const { data } = await axiosClient.get<Response<Todo[]>>(this._baseUrl, { headers: { Authorization: token } });
    return Array.isArray(data?.data) ? data.data : [];
  }


  async create(title: string, description: string): Promise<void> {
    const token = this.authService.getToken();
    if (!this._baseUrl) throw new Error('Auth url not set');
    if (!token) throw new Error('No token found');
    await axiosClient.post(this._baseUrl, { title, description }, { headers: { Authorization: token } });
  }

  async update(id: string, status: string): Promise<void> {
    const token = this.authService.getToken();
    if (!this._baseUrl) throw new Error('Auth url not set');
    if (!token) throw new Error('No token found');
    await axiosClient.put(`${this._baseUrl}/${id}`, {
      status
    }, { headers: { Authorization: token } });

  }

  async delete(id: string): Promise<void> {
    const token = this.authService.getToken();
    if (!this._baseUrl) throw new Error('Auth url not set');
    if (!token) throw new Error('No token found');
    await axiosClient.delete(`${this._baseUrl}/${id}`, { headers: { Authorization: token } });
  }
}
