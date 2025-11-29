import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiUrl:string=`${environment.apiUrl}/comentarios`;

  constructor(private http:HttpClient) { }

  crearComentario(comentario: any): Observable<Comentario> {
    return this.http.post<Comentario>(this.apiUrl, comentario);
  }

  obtenerComentariosPorPublicacion(publicacionId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/publicacion/${publicacionId}`);
  }

  actualizarComentario(id: number, comentario: any): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.apiUrl}/${id}`, comentario);
  }

  eliminarComentario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  responderComentario(comentarioPadreId: number, comentario: any): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.apiUrl}/${comentarioPadreId}/respuestas`, comentario);
  }
}
