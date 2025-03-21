import { TodoService } from '../src/services/todo/todo.service';
import { AuthService } from '../src/services/auth/auth.service';
import { axiosClient } from '../src/client';
import { Todo } from '../src/services/todo/todo.interface';

jest.mock('../src/client', () => ({
    axiosClient: {
        get: jest.fn(),
    },
}));

describe('TodoService', () => {
    let todoService: TodoService;
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
        todoService = new TodoService(authService);
    });

    it('should throw an error if base URL is not set', async () => {
        todoService['_baseUrl'] = '';
        await expect(todoService.getAll()).rejects.toThrow('Auth url not set');
    });

    it('should throw an error if no token is found', async () => {
        jest.spyOn(authService, 'getToken').mockReturnValue('');
        await expect(todoService.getAll()).rejects.toThrow('No token found');
    });

    it('should return a list of todos if base URL and token are set', async () => {
        todoService['_baseUrl'] = 'https://a3y2gjqdp6.execute-api.us-east-1.amazonaws.com/dev';
        jest.spyOn(authService, 'getToken').mockReturnValue('test-token');
        const mockTodos: Todo[] = [
            { id: '1', title: 'Test Todo 1', description: 'Description 1', status: 'En progreso', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), deletedAt: null },
            { id: '1', title: 'Test Todo 2', description: 'Description 2', status: 'Por hacer', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), deletedAt: null },
        ];
        (axiosClient.get as jest.Mock).mockResolvedValue({ data: { data: mockTodos } });

        const result = await todoService.getAll();

        expect(result).toEqual(mockTodos);
        expect(axiosClient.get).toHaveBeenCalledWith(
            'https://a3y2gjqdp6.execute-api.us-east-1.amazonaws.com/dev',
            { headers: { Authorization: 'test-token' } }
        );
    });
});