import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl : string='http://localhost:8080/auth'

  constructor(private http : HttpClient) { }

  login( credenciales : LoginRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`,credenciales)
  }
}
