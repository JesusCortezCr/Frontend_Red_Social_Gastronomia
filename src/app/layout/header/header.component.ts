import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  implements OnInit{
  isLoggedIn:boolean=false;
  userRole:string | null =null;
  userEmail:string | null =null;
  isMenuOpen: boolean = false;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.chequearEstadoAuth();
  }

  chequearEstadoAuth() {
    const token=localStorage.getItem('token');
    this.isLoggedIn=!!token;
    if(this.isLoggedIn){
      this.userEmail=localStorage.getItem('correo');
      this.userRole=localStorage.getItem('rol');
    }
  }
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  loggout(){
    this.authService.logout().subscribe({
      next:()=>{
        //limpia el local storage
        this.resetLocalStateAndClearSession();
      },
      error:(error)=>{
        console.log('Error al cerrar sesion: ',error);
        this.resetLocalStateAndClearSession();
      }
    })
  }
resetLocalStateAndClearSession() {
    // 1. Limpia el Local Storage y navega (AuthService.clearSession hace esto)
    this.authService.clearSession();
    
    // 2. Resetea los estados del componente (Header)
    this.isLoggedIn=false;
    this.userEmail=null;
    this.userRole=null;
    this.isMenuOpen=false;
    
    // El AuthService ya redirige, si quieres redirigir a una página diferente (ej. inicio), cámbialo aquí:
    this.router.navigate(['/']); 
  }
  

  
}
