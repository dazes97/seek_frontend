import { AuthService } from '../src/services';
import { axiosClient } from '../src/client';

jest.mock('../src/client', () => ({
    axiosClient: {
        post: jest.fn(),
    },
}));

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
    });

    it('should throw an error if base URL is not set', async () => {
        authService['_baseUrl'] = '';
        await expect(authService.login('test@example.com', 'password')).rejects.toThrow('Auth url not set');
    });

    it('should return a token if login is successful', async () => {
        const mockResponse = {
            data: {
                data: [{ token: 'test-token' }],
            },
        };
        (axiosClient.post as jest.Mock).mockResolvedValue(mockResponse);

        const result = await authService.login('test@example.com', 'password');
        expect(result).toEqual({ token: 'test-token' });
    });

    it('should return null if data is not an array', async () => {
        const mockResponse = {
            data: {
                data: { token: 'test-token' },
            },
        };
        (axiosClient.post as jest.Mock).mockResolvedValue(mockResponse);

        const result = await authService.login('test@example.com', 'password');
        expect(result).toEqual({ token: null });
    });
});