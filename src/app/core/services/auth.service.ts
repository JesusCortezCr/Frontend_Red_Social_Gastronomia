import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RegisterRequest, Usuario } from '../models';
import { Router } from '@angular/router';

interface LoginRequest{
  correo: string;
  password : string;
}

interface LoginResponse{
  token : string;
  correo: string;
  rol : string;
}


@Injectable({
  //singleton del servicio para que pueda ser acce
  providedIn: 'root'
})
export class AuthService {

  //URL base de autenticacion
  private apiUrl=`${environment.apiUrl}/api/auth`;


  //guarda el estado actual del usuario autenticado
  private currentUserSubject=new BehaviorSubject<Usuario | null> (this.getUserFromStorage());

  //observable para que otros componentes se suscriban a los cambios del usuario autenticado ademas de exponer el valor actual
  public currentUser$=this.currentUserSubject.asObservable();

  constructor(
      private http : HttpClient , //dependencia para hacer peticiones HTTP,
      private router : Router //dependencia para navegar entre rutas
    ) { }

  private getUserFromStorage() : Usuario | null {
    const userJson=localStorage.getItem('currentUser'); //leer datos del usuario desde el local storage
    return userJson ? JSON.parse(userJson) : null; //parsear JSON a objeto Usuario o retornar null si no hay datos
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated() : boolean{
    return !!this.getToken();
  }

  get currentUser() : Usuario | null{
    return this.currentUserSubject.value;
  }

//login segun tu endpoint  POST /api/auth/login
//metodo que recibe credenciales como correo y password y devuelve un observable con la respuesta del backend
login(credentials: LoginRequest) : Observable<LoginResponse>{ 
  return this.http.post<LoginResponse>(`${this.apiUrl}/login`,credentials)
  .pipe(
    //tap permite ejecutar efectos secundarios sin modificar el flujo de datos
    tap(response=>{
      //guardar token en el local storage
      localStorage.setItem('token',response.token);

      //guardar datos del usuario (necesitaras obtenerlos despues)
      const userData={
        correo : response.correo,
        rol : {nombre : response.rol}
      };
      localStorage.setItem('currentUser',JSON.stringify(userData));
    })
  )
}

//registro segun tu endpoint POST /api/auth/registro
register(data:RegisterRequest): Observable<string>{
  return this.http.post(`${this.apiUrl}/registro`,data , {responseType : 'text'});
}

logout(): void{
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
  this.router.navigate(['/auth/login']);
}

}
