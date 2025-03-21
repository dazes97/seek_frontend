import { IAuthService } from "./auth.interface";
import { axiosClient } from "../../client";
import { Response } from "../response.interface";

export class AuthService implements IAuthService {
    private _baseUrl: string = import.meta.env.VITE_AUTH_URL;
    async login(email: string, password: string): Promise<{token:string|null}> {
        if(!this._baseUrl) throw new Error('Auth url not set');
        const {data:{data}} = await axiosClient.post<Response<{token:string|null}>>(this._baseUrl,{
            email,  
            password
        })
        return { token: Array.isArray(data)?data[0].token:null};
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }
    getToken(): string {
        return localStorage.getItem('token')?? '';
    }
    logout(): void {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }


}