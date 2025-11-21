import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login-response.interface';
import { RegistroRequest, RegistroResponse } from '../models/register-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl : string='http://localhost:8080/auth'

  constructor(private http : HttpClient) { }

  login( credenciales : LoginRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`,credenciales)
  }

  registro(credenciales : RegistroRequest):Observable<RegistroResponse>{
    return this.http.post<RegistroResponse>(`${this.apiUrl}/registro/`,credenciales);
  }
}
