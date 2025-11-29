import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login-response.interface';
import { RegistroRequest, RegistroResponse } from '../models/register-request.interface';
import { LogoutResponse } from '../models/logout-response.interface';
import { Router } from '@angular/router';


const CORREO_KEY = 'correo';
const ROL_KEY = 'rol';
const TOKEN_KEY = 'token';

const USER_ID_KEY = 'userId';
const USER_DATA_KEY = 'userData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl: string = 'http://localhost:8080/api/auth'

  constructor(private http: HttpClient, private router: Router) { }

  login(credenciales: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credenciales)
  }

  registro(credenciales: RegistroRequest): Observable<RegistroResponse> {
    return this.http.post<RegistroResponse>(`${this.apiUrl}/registro`, credenciales);
  }

  logout(): Observable<LogoutResponse> {
    return this.http.post<LogoutResponse>(`${this.apiUrl}/logout`, {});
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token && token !== 'null' && token !== 'undefined';
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getCurrentRole(): string | null {
    return localStorage.getItem(ROL_KEY);
  }

  clearSession(): void {
    console.log("🔴 Ejecutando Limpieza de Sesión: Limpiando Local Storage...");
    // Usamos 'token'
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROL_KEY);
    localStorage.removeItem(CORREO_KEY);

    this.router.navigate(['/auth/login']);
    console.log("✅ Local Storage limpiado y redirigido.");
  }

  saveUserSession(data: any): void {
    if (!data) return;

    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }

    if (data.rol) {
      localStorage.setItem(ROL_KEY, data.rol);
    }

    if (data.correo) {
      localStorage.setItem(CORREO_KEY, data.correo);
    }

    if (data.id) {
      localStorage.setItem(USER_ID_KEY, data.id.toString());
    }



    localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
  }

  getUserId(): number | null {
    const id = localStorage.getItem(USER_ID_KEY);
    return id ? Number(id) : null;
  }

  getUserData(): any | null {
    const data = localStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }
}
