import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Publicacion } from '../../../../core/models/publicacion';
import { PublicacionService } from '../../../../core/services/publicacion.service';
import { ComentariosComponent } from "../../../../components/comentario/comentario.component";

@Component({
  selector: 'app-home-user',
  imports: [RouterModule, CommonModule, ComentariosComponent],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css',
})
export class HomeUserComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  cargando: boolean = false;
  error: string = '';
  publicacionConComentarios: number | null = null;

  constructor(private publicacionService: PublicacionService) {}

  ngOnInit(): void {
    console.log('🔍 Token en home-user:', localStorage.getItem('authToken'));
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    this.cargando = true;
    this.error = '';
    this.publicacionService.listarPublicaciones().subscribe({
      next: (data) => {
        console.log('publicaciones cargadas:', data);
        this.publicaciones = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar publicaciones:', err);
        this.error =
          'Error al cargar las publicaciones. Por favor intenta de nuevo.';
        this.cargando = false;
      },
    });
  }

  obtenerIniciales(nombre: string): string {
    return nombre.charAt(0).toUpperCase();
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    const ahora = new Date();
    const diff = ahora.getTime() - date.getTime();
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);

    if (minutos < 60) return `Hace ${minutos} min`;
    if (horas < 24) return `Hace ${horas}h`;
    if (dias < 7) return `Hace ${dias}d`;
    return date.toLocaleDateString();
  }

  toggleComentarios(publicacionId: number) {
    if (this.publicacionConComentarios === publicacionId) {
      this.publicacionConComentarios = null;
    } else {
      this.publicacionConComentarios = publicacionId;
    }
  }

  onComentarioCreado() {
    // Recargar publicaciones para actualizar contadores
    this.cargarPublicaciones();
  }
}
