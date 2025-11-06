import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ComentatarioService {
  private apiUrl = `${environment.apiUrl}/comentarios`;

  constructor(private http: HttpClient) {}

  //GET LISTAR TODOS LOS COMENTARIOS
  traerComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.apiUrl);
  }

  //GET buscar comentatario por id
  buscarComentatarioPorId(comentarioId: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.apiUrl}/${comentarioId}`);
  }

  //post crear comentario /comentarios/publicacion/{publicacionId}/usuario/{usuarioId}
  crearComentario(
    publicacionId: number,
    usuarioId: number,
    comentario: Partial<Comentario>
  ): Observable<Comentario> {
    return this.http.post<Comentario>(
      `${this.apiUrl}/publicacion/${publicacionId}/usuario/${usuarioId}`,
      comentario
    );
  }

  //put comentario   // PUT /comentarios/{id} - Modificar comentario
//duda ruta
  modificarComentario(
    id: number,
    comentario: Partial<Comentario>
  ): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.apiUrl}/${id}`, comentario);
  }

  //eliminar comentario /comentarios/{id} - Eliminar comentario
  eliminarComentario(comentarioId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${comentarioId}`);
  }
}
