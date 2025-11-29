import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_URL = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarioById(id: number) {
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.get(`${this.API_URL}/${id}`, { headers });
}

  updateUsuario(id: number, data: any) {
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.put(`${this.API_URL}/${id}`, data, { headers });
}
}
