export interface IAuthService{
    login(email: string, password: string): Promise<{token:string|null}>;
    saveToken(token:string): void;
    getToken(): string;
    logout(): void;
}