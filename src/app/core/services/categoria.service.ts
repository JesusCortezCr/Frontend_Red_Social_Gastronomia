import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl:string=`${environment.apiUrl}`

  constructor(private http:HttpClient) { }

  traerCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }
}
