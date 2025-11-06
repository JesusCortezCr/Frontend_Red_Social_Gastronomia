import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private apiUrl=`${environment.apiUrl}/publicaciones`;

  constructor(private http:HttpClient){}

  //get /publicaciones - listar todas las publicaciones
  listarPublicaciones(): Observable<Publicacion[]>{
    return this.http.get<Publicacion[]>(this.apiUrl);
  }

  //post /publicaciones/usuario/{usuarioId}/categoria/{categoriaId} - crear nueva publicacion

  crearPublicacion(
    usuarioId:number,
    categoriaId:number,
    publicacion : Partial<Publicacion>
  ) : Observable<Publicacion>{
    return this.http.post<Publicacion>(
      `${this.apiUrl}/usuario/${usuarioId}/categoria/${categoriaId}`,
      publicacion
    )
  }
  

}
