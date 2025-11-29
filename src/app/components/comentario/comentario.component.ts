// comentarios.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comentario } from '../../core/models/comentario';
import { ComentarioService } from '../../core/services/comentario.service';
import { AuthService } from '../../core/services/auth.service';

interface ComentarioExtendido extends Comentario {
  editando?: boolean;
  contenidoEditado?: string;
  mostrandoRespuesta?: boolean;
  nuevaRespuesta?: string;
}

@Component({
  selector: 'app-comentarios',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mt-4 border-t pt-4">
      <!-- Formulario para nuevo comentario -->
      <div class="mb-4">
        <textarea 
          [(ngModel)]="nuevoComentario" 
          placeholder="Escribe un comentario..."
          class="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
        <div class="flex justify-end mt-2">
          <button 
            (click)="crearComentario()"
            [disabled]="!nuevoComentario.trim()"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Comentar
          </button>
        </div>
      </div>

      <!-- Lista de comentarios -->
      <div class="space-y-4">
        <div *ngFor="let comentario of comentarios" class="bg-white rounded-lg p-4 border">
          <!-- Comentario principal -->
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              {{ obtenerIniciales(comentario.usuario.nombre) }}
            </div>
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <span class="font-semibold text-gray-900">{{ comentario.usuario.nombre }}</span>
                <span class="text-xs text-gray-500">{{ formatearFecha(comentario.fechaCreacion) }}</span>
              </div>
              
              <!-- Contenido del comentario -->
              <div *ngIf="!comentario.editando" class="mt-1">
                <p class="text-gray-700">{{ comentario.contenido }}</p>
              </div>

              <!-- Edición del comentario -->
              <div *ngIf="comentario.editando" class="mt-2">
                <textarea 
                  [(ngModel)]="comentario.contenidoEditado"
                  class="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                ></textarea>
                <div class="flex space-x-2 mt-2">
                  <button 
                    (click)="guardarEdicion(comentario)"
                    [disabled]="!comentario.contenidoEditado?.trim()"
                    class="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:bg-gray-300"
                  >
                    Guardar
                  </button>
                  <button 
                    (click)="cancelarEdicion(comentario)"
                    class="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>

              <!-- Acciones del comentario -->
              <div class="flex items-center space-x-4 mt-2">
                <button 
                  (click)="toggleMeGusta(comentario)"
                  class="flex items-center space-x-1 text-gray-500 hover:text-red-500"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                  <span class="text-xs">Me gusta</span>
                </button>

                <button 
                  (click)="toggleRespuesta(comentario)"
                  class="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                  </svg>
                  <span class="text-xs">Responder</span>
                </button>

                <!-- Solo mostrar editar/eliminar si es el dueño del comentario -->
                <div *ngIf="esPropietario(comentario)" class="flex space-x-2">
                  <button 
                    (click)="iniciarEdicion(comentario)"
                    class="text-gray-500 hover:text-yellow-500 text-xs"
                  >
                    Editar
                  </button>
                  <button 
                    (click)="eliminarComentario(comentario.id)"
                    class="text-gray-500 hover:text-red-500 text-xs"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <!-- Formulario para respuesta -->
              <div *ngIf="comentario.mostrandoRespuesta" class="mt-3 ml-4 border-l-2 border-gray-200 pl-4">
                <textarea 
                  [(ngModel)]="comentario.nuevaRespuesta"
                  placeholder="Escribe una respuesta..."
                  class="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                ></textarea>
                <div class="flex space-x-2 mt-2">
                  <button 
                    (click)="crearRespuesta(comentario)"
                    [disabled]="!comentario.nuevaRespuesta?.trim()"
                    class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:bg-gray-300"
                  >
                    Responder
                  </button>
                  <button 
                    (click)="cancelarRespuesta(comentario)"
                    class="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>

              <!-- Respuestas -->
              <div *ngIf="comentario.respuestas && comentario.respuestas.length > 0" class="mt-3 ml-4 border-l-2 border-gray-200 pl-4">
                <div *ngFor="let respuesta of comentario.respuestas" class="mb-3">
                  <div class="flex items-start space-x-2">
                    <div class="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                      {{ obtenerIniciales(respuesta.usuario.nombre) }}
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center space-x-2">
                        <span class="font-semibold text-gray-900 text-sm">{{ respuesta.usuario.nombre }}</span>
                        <span class="text-xs text-gray-500">{{ formatearFecha(respuesta.fechaCreacion) }}</span>
                      </div>
                      <p class="text-gray-700 text-sm mt-1">{{ respuesta.contenido }}</p>
                      
                      <!-- Acciones para respuestas -->
                      <div *ngIf="esPropietario(respuesta)" class="flex space-x-2 mt-1">
                        <button 
                          (click)="iniciarEdicion(respuesta)"
                          class="text-gray-500 hover:text-yellow-500 text-xs"
                        >
                          Editar
                        </button>
                        <button 
                          (click)="eliminarComentario(respuesta.id)"
                          class="text-gray-500 hover:text-red-500 text-xs"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ComentariosComponent {
  @Input() publicacionId!: number;
  @Output() comentarioCreado = new EventEmitter<void>();
  
  comentarios: ComentarioExtendido[] = [];
  nuevoComentario: string = '';

  constructor(private comentarioService: ComentarioService , private authService:AuthService) {}

  ngOnInit() {
    this.cargarComentarios();
  }

  cargarComentarios() {
    this.comentarioService.obtenerComentariosPorPublicacion(this.publicacionId)
      .subscribe({
        next: (comentarios) => {
          this.comentarios = comentarios.map(comentario => ({
            ...comentario,
            editando: false,
            contenidoEditado: comentario.contenido,
            mostrandoRespuesta: false,
            nuevaRespuesta: ''
          }));
        },
        error: (err) => {
          console.error('Error al cargar comentarios:', err);
        }
      });
  }

  crearComentario() {
  if (!this.nuevoComentario.trim()) return;

  const comentarioData = {
    contenido: this.nuevoComentario,
    publicacionId: this.publicacionId,      // ✅ Usa publicacionId
    usuarioId: this.obtenerUsuarioActualId() // ✅ Usa usuarioId
  };

  console.log('Enviando comentario DTO:', comentarioData);

  this.comentarioService.crearComentario(comentarioData)
    .subscribe({
      next: (comentario) => {
        console.log('Comentario creado exitosamente:', comentario);
        const comentarioExtendido: ComentarioExtendido = {
          ...comentario,
          editando: false,
          contenidoEditado: comentario.contenido,
          mostrandoRespuesta: false,
          nuevaRespuesta: ''
        };
        this.comentarios.unshift(comentarioExtendido);
        this.nuevoComentario = '';
        this.comentarioCreado.emit();
      },
      error: (err) => {
        console.error('Error al crear comentario:', err);
        alert('Error al crear el comentario: ' + err.message);
      }
    });
}

crearRespuesta(comentarioPadre: ComentarioExtendido) {
  if (!comentarioPadre.nuevaRespuesta?.trim()) return;

  const respuestaData = {
    contenido: comentarioPadre.nuevaRespuesta,
    publicacionId: this.publicacionId,      
    usuarioId: this.obtenerUsuarioActualId() 
  };

  this.comentarioService.responderComentario(comentarioPadre.id, respuestaData)
    .subscribe({
      next: (respuesta) => {
        if (!comentarioPadre.respuestas) {
          comentarioPadre.respuestas = [];
        }
        const respuestaExtendida: ComentarioExtendido = {
          ...respuesta,
          editando: false,
          contenidoEditado: respuesta.contenido,
          mostrandoRespuesta: false,
          nuevaRespuesta: ''
        };
        comentarioPadre.respuestas.push(respuestaExtendida);
        comentarioPadre.nuevaRespuesta = '';
        comentarioPadre.mostrandoRespuesta = false;
      },
      error: (err) => {
        console.error('Error al crear respuesta:', err);
      }
    });
}

  iniciarEdicion(comentario: ComentarioExtendido) {
    comentario.editando = true;
    comentario.contenidoEditado = comentario.contenido;
  }

  guardarEdicion(comentario: ComentarioExtendido) {
    if (!comentario.contenidoEditado?.trim()) return;

    this.comentarioService.actualizarComentario(comentario.id, {
      contenido: comentario.contenidoEditado
    }).subscribe({
      next: (comentarioActualizado) => {
        comentario.contenido = comentarioActualizado.contenido;
        comentario.editando = false;
      },
      error: (err) => {
        console.error('Error al actualizar comentario:', err);
      }
    });
  }

  cancelarEdicion(comentario: ComentarioExtendido) {
    comentario.editando = false;
    comentario.contenidoEditado = '';
  }

  cancelarRespuesta(comentario: ComentarioExtendido) {
    comentario.mostrandoRespuesta = false;
    comentario.nuevaRespuesta = '';
  }

  eliminarComentario(comentarioId: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      this.comentarioService.eliminarComentario(comentarioId)
        .subscribe({
          next: () => {
            this.removerComentarioDeLista(this.comentarios, comentarioId);
          },
          error: (err) => {
            console.error('Error al eliminar comentario:', err);
          }
        });
    }
  }

  private removerComentarioDeLista(comentarios: ComentarioExtendido[], id: number): boolean {
    for (let i = 0; i < comentarios.length; i++) {
      if (comentarios[i].id === id) {
        comentarios.splice(i, 1);
        return true;
      }
      if (comentarios[i].respuestas && this.removerComentarioDeLista(comentarios[i].respuestas as ComentarioExtendido[], id)) {
        return true;
      }
    }
    return false;
  }

  toggleRespuesta(comentario: ComentarioExtendido) {
    comentario.mostrandoRespuesta = !comentario.mostrandoRespuesta;
    if (!comentario.nuevaRespuesta) {
      comentario.nuevaRespuesta = '';
    }
  }

  toggleMeGusta(comentario: Comentario) {
    console.log('Me gusta en comentario:', comentario.id);
  }

  esPropietario(comentario: Comentario): boolean {
    const usuarioActualId = this.obtenerUsuarioActualId();
    return comentario.usuario.id === usuarioActualId;
  }

  obtenerUsuarioActualId(): number | null {
  return this.authService.getCurrentUserId();
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