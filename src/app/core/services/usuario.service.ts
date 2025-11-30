import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

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

  obtenerUsuarios(): Observable<Usuario[]> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get<Usuario[]>(this.API_URL, { headers });
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.post<Usuario>(this.API_URL, usuario, { headers });
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.put<Usuario>(`${this.API_URL}/${usuario.id}`, usuario, { headers });
  }

  eliminarUsuario(id: string): Observable<void> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.delete<void>(`${this.API_URL}/${id}`, { headers });
  }
}
