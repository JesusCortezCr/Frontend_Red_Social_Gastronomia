import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl=`${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) { }

  //get /categorias -listar todas las categorias
  listarCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  //get /categorias por id /categorias/{id}
  obtenerCategoriaPorId(categoriaId:number):Observable<Categoria>{
    return this.http.get<Categoria>(`${this.apiUrl}/${categoriaId}`);
  }
  //post /categorias - creara una nueva categoria
  crearCategoria(categoria:Partial<Categoria>):Observable<Categoria>{
    return this.http.post<Categoria>(this.apiUrl,categoria);
  }

  //put actualizar categoria /categorias/{id}
  actualizarCategoria(categoriaId:number,categoria:Partial<Categoria>):Observable<Categoria>{
    return this.http.put<Categoria>(`${this.apiUrl}/${categoriaId}`,categoria);
  }

  //delete eliminar categoria /categorias/{id}
  eliminarCategoria(categoriaId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${categoriaId}`);
  }
}
