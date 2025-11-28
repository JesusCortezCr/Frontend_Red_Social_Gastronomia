import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login-response.interface';
import { RegistroRequest, RegistroResponse } from '../models/register-request.interface';
import { LogoutResponse } from '../models/logout-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl : string='http://localhost:8080/api/auth'

  constructor(private http : HttpClient) { }

  login( credenciales : LoginRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`,credenciales)
  }

  registro(credenciales : RegistroRequest):Observable<RegistroResponse>{
    return this.http.post<RegistroResponse>(`${this.apiUrl}/registro`,credenciales);
  }

  logout():Observable<LogoutResponse>{
    return this.http.post<LogoutResponse>(`${this.apiUrl}/logout`,{});
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token && token !== 'null' && token !== 'undefined';
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getCurrentRole(): string | null {
    return localStorage.getItem('rol');
  }

  clearSession(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('rol');
    localStorage.removeItem('correo');
  }
}
