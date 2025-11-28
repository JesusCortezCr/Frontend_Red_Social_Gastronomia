import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../../../../core/models/publicacion';
import { PublicacionService } from '../../../../core/services/publicacion.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-publication',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-publication.component.html',
  styleUrl: './my-publication.component.css',
})
export class MyPublicationComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  cargando: boolean = false;
  error: string = '';
  mensajeConfirmacion: string = '';

  constructor(private publicacionService: PublicacionService) {}
  ngOnInit(): void {
    this.cargarMisPublicaciones();
  }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error' = 'success') {
    this.mensajeConfirmacion = '';
    this.error = '';
    if (tipo === 'success') {
      this.mensajeConfirmacion = mensaje;
    } else {
      this.error = mensaje;
    }
    setTimeout(() => {
      this.mensajeConfirmacion = '';
      this.error = '';
    }, 5000); // Ocultar mensaje después de 5 segundos
  }

  cargarMisPublicaciones() {
    this.cargando = true;
    this.mensajeConfirmacion='';
    this.error='';
    this.publicacionService.traerMisPublicaciones().subscribe({
      next: (data) => {
        this.publicaciones = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar mis publicaciones:', error);
        this.cargando = false;
      },
    });
  }

  editarPublicacion(id: number) {}

  eliminarPublicacion(id: number, titulo: string): void {
    if (confirm(`¿Estás seguro de eliminar la publicación "${titulo}"?`)) {
      console.log('🗑️ Eliminando publicación:', id);

      this.publicacionService.eliminarPublicacion(id).subscribe({
        next: () => {
          console.log('✅ Publicación eliminada');
          alert('Publicación eliminada con éxito');
          // Recargar la lista
          this.cargarMisPublicaciones();
        },
        error: (err) => {
          console.error('❌ Error al eliminar:', err);
          alert('Error al eliminar la publicación');
        },
      });
    }
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
}
