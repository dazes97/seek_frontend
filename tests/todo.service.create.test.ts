import { TodoService } from '../src/services/todo/todo.service';
import { AuthService } from '../src/services/auth/auth.service';
import { axiosClient } from '../src/client';

jest.mock('../src/client', () => ({
    axiosClient: {
        post: jest.fn(),
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
        await expect(todoService.create('Test Title', 'Test Description')).rejects.toThrow('Auth url not set');
    });

    it('should throw an error if no token is found', async () => {
        jest.spyOn(authService, 'getToken').mockReturnValue('');
        await expect(todoService.create('Test Title', 'Test Description')).rejects.toThrow('No token found');
    });

    it('should create a todo if base URL and token are set', async () => {
        todoService['_baseUrl'] = 'https://a3y2gjqdp6.execute-api.us-east-1.amazonaws.com/dev';
        jest.spyOn(authService, 'getToken').mockReturnValue('test-token');
        (axiosClient.post as jest.Mock).mockResolvedValue({});

        await todoService.create('Test Title', 'Test Description');

        expect(axiosClient.post).toHaveBeenCalledWith(
            'https://a3y2gjqdp6.execute-api.us-east-1.amazonaws.com/dev',
            { title: 'Test Title', description: 'Test Description' },
            { headers: { Authorization: 'test-token' } }
        );
    });
});