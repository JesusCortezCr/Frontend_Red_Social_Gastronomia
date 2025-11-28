import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Publicacion, PublicacionRequest } from '../models/publicacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private apiUrl:string =`${environment.apiUrl}/publicaciones`
  constructor(private http:HttpClient) { }

  crearPublicacion(publicacion: PublicacionRequest , image:File):Observable<Publicacion>{
    const formData=new FormData();
    const publicacionBlob = new Blob([JSON.stringify(publicacion)], {
      type: 'application/json'
    });
    formData.append('publicacion', publicacionBlob);
    formData.append('file', image);
    return this.http.post<Publicacion>(this.apiUrl, formData);
  }

  listarPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl);
  }

  cambiarImagenPublicacion(id:number,image:File):Observable<Publicacion>{
    const formData=new FormData();
    formData.append('file',image);
    return this.http.put<Publicacion>(`${this.apiUrl}/${id}/image`,formData);
  }

  traerMisPublicacionesPorId(id:number):Observable<Publicacion[]>{
    //traer Id persona logeada
    return this.http.get<Publicacion[]>(`${this.apiUrl}/mis-publicaciones/${id}`);
  }
}
