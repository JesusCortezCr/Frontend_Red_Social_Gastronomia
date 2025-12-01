import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../../core/services/usuario.service'; 
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [UsuarioService, AuthService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: any = {password: ''};
  esAdministrador: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {}



  ngOnInit(): void {
    const rol = this.authService.getCurrentRole(); // Obtener el rol actual
    this.esAdministrador = rol === 'ROLE_ADMINISTRADOR'

    const id = this.authService.getCurrentUserId();
    console.log("ID usuario desde localStorage:", id); 

    if (!id) {
      console.error("❌ No hay ID de usuario guardado.");
      return;
    }

    this.usuarioService.getUsuarioById(id).subscribe({
      next: (data: any) => {
        this.usuario = { ...data, password: '' };
        console.log("Usuario cargado:", data);
      },
      error: (err: any) => console.error(err)
    });
  }

  guardarCambios(): void {
    if (!this.usuario.id) return;

    this.usuarioService.updateUsuario(this.usuario.id, this.usuario).subscribe({
      next: () => alert("Cambios guardados."),
      error: (err: any) => console.error(err)
    });
  }
}
