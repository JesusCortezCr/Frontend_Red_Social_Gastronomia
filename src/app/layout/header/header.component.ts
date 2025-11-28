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
        this.handleLogout();
      },
      error:(error)=>{
        console.log('Error al cerrar sesion: ',error);
        this.handleLogout();
      }
    })
  }
  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('correo');

    this.isLoggedIn=false;
    this.userEmail=null;
    this.userRole=null;
    this.isMenuOpen=false;
    this.router.navigate(['/'])
  }

  
}
