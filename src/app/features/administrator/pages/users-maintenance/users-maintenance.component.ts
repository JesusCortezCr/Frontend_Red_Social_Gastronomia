import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { Usuario } from '../../../../core/models/usuario.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users-maintenance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-maintenance.component.html',
  styleUrl: './users-maintenance.component.css'
})
export class UsersMaintenanceComponent implements OnInit, OnDestroy {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  backendUsesRolObject = false;
  roleNameToId: Record<string, number> = {};
  loading = true;
  error: string | null = null;
  successMessage: string | null = null;
  searchTerm = '';
  selectedRole = '';
  showModal = false;
  isEditing = false;
  
  usuarioForm: any = {
    id: '',
    correo: '',
    nombre: '',
    apellido: '',
    rol: 'ROLE_USUARIO',
    status: 'ACTIVO',
    bloqueado: false
  };

  roles: any[] = ['ROLE_ADMINISTRADOR', 'ROLE_MODERADOR', 'ROLE_USUARIO', 'ADMIN', 'MODERATOR', 'USER'];
  private destroy$ = new Subject<void>();

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.error = null;
    this.successMessage = null;
    
    console.log('📢 Iniciando carga de usuarios...');
    
    this.usuarioService.obtenerUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Usuario[]) => {
          console.log('📊 Datos recibidos del servidor:', data);
          this.usuarios = data || [];
          this.backendUsesRolObject = false;
          this.roleNameToId = {};
          for (const u of this.usuarios as any[]) {
            if (u.rol && typeof u.rol === 'object') {
              this.backendUsesRolObject = true;
              const name = u.rol.nombre || u.rol.name || u.rol.nombreRol || String(u.rol);
              if (u.rol.id !== undefined && name) {
                this.roleNameToId[name] = u.rol.id;
              }
            }
          }
          this.filtrar();
          this.loading = false;
          console.log('✅ Total de usuarios cargados:', this.usuarios.length);
        },
        error: (err: any) => {
          console.error('❌ Error completo:', err);
          console.error('Status:', err.status);
          console.error('Mensaje:', err.message);
          console.error('Error:', err.error);
          
          this.error = `Error al cargar usuarios. Status: ${err.status} - ${err.statusText || 'Error desconocido'}`;
          console.error('❌ Error al cargar usuarios:', err);
          this.loading = false;
          this.usuarios = [];
          this.usuariosFiltrados = [];
        }
      });
  }

  filtrar(): void {
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      const anyUser = usuario as any;
      const esUsuario =
        anyUser.rol_id === 2 ||
        anyUser.rolId === 2 ||
        (anyUser.rol && (anyUser.rol.id === 2 || anyUser.rolId === 2));
      if (!esUsuario) return false;
      const correo = (usuario as any).correo || '';
      const coincideTexto = `${usuario.nombre} ${usuario.apellido} ${correo}`.toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      return coincideTexto;
    });
  }

  onSearchChange(): void {
    this.filtrar();
  }

  onRoleChange(): void {
    this.filtrar();
  }

  abrirModalNuevo(): void {
    this.isEditing = false;
    this.usuarioForm = {
      id: '',
      correo: '',
      nombre: '',
      apellido: '',
      rol: 'ROLE_USUARIO',
      status: 'ACTIVO',
      bloqueado: false
    };
    this.showModal = true;
  }

  abrirModalEditar(usuario: Usuario): void {
    this.isEditing = true;
    this.usuarioForm = { ...usuario } as any;
    const anyU: any = usuario as any;
    if (anyU.rol && typeof anyU.rol === 'object') {
      this.usuarioForm.rol = anyU.rol.nombre || anyU.rol.name || this.usuarioForm.rol;
    }

    if (anyU.bloqueado) {
      this.usuarioForm.status = 'BLOQUEADO';
    } else if (anyU.estado === false) {
      this.usuarioForm.status = 'DESACTIVADO';
    } else {
      this.usuarioForm.status = 'ACTIVO';
    }

    this.usuarioForm.bloqueado = !!anyU.bloqueado;
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.usuarioForm = {
      id: '',
      correo: '',
      nombre: '',
      apellido: '',
      rol: 'ROLE_USUARIO',
      status: 'ACTIVO',
      bloqueado: false
    };
  }

  guardarUsuario(): void {
    if (!this.usuarioForm.nombre || !this.usuarioForm.correo || !this.usuarioForm.apellido) {
      this.error = 'Por favor completa todos los campos requeridos';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.usuarioForm.correo)) {
      this.error = 'Por favor ingresa un email válido';
      return;
    }


    const payload: any = { ...this.usuarioForm };

    if (payload.status === 'BLOQUEADO') {
      payload.bloqueado = true;
      payload.estado = false;
    } else if (payload.status === 'DESACTIVADO') {
      payload.bloqueado = false;
      payload.estado = false;
    } else {
      payload.bloqueado = false;
      payload.estado = true;
    }

    if (payload.rol === 'USER') payload.rol = 'ROLE_USUARIO';
    if (payload.rol === 'ADMIN') payload.rol = 'ROLE_ADMINISTRADOR';
    if (payload.rol === 'MODERATOR') payload.rol = 'ROLE_MODERADOR';

    try {
      const currentRole = payload.rol;
      if (typeof currentRole === 'string') {
        const desiredRoleName = currentRole;
        const mappedId = this.roleNameToId[desiredRoleName];
        if (mappedId !== undefined) {
          payload.rol = { id: mappedId, nombre: desiredRoleName };
        } else if (payload.rol_id) {
          payload.rol = { id: payload.rol_id, nombre: desiredRoleName };
        } else {
          payload.rol = { nombre: desiredRoleName };
        }
      }
    } catch (e) {
      console.warn('No se pudo normalizar rol a objeto, enviando lo que haya:', e);
    }

    this.loading = true;
    this.error = null;
    const operacion = this.isEditing
      ? this.usuarioService.actualizarUsuario(payload as Usuario)
      : this.usuarioService.crearUsuario(payload as Usuario);

    operacion
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.successMessage = this.isEditing ? '✅ Usuario actualizado correctamente' : '✅ Usuario creado correctamente';
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: (err: any) => {
          const errorMsg = err.error?.message || err.message;
          this.error = this.isEditing 
            ? `Error al actualizar usuario: ${errorMsg}` 
            : `Error al crear usuario: ${errorMsg}`;
          console.error('Error:', err);
          this.loading = false;
        }
      });
  }

  eliminarUsuario(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.loading = true;
      this.error = null;
      
      this.usuarioService.eliminarUsuario(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.successMessage = '✅ Usuario eliminado correctamente';
            setTimeout(() => {
              this.successMessage = null;
            }, 3000);
            this.cargarUsuarios();
          },
          error: (err: any) => {
            this.error = 'Error al eliminar usuario';
            console.error('Error:', err);
            this.loading = false;
          }
        });
    }
  }

  getRolNombre(rol: any): string {
    if (typeof rol === 'object' && rol !== null) {
      return rol.nombre || rol.name || 'Usuario';
    }
    return String(rol || 'Usuario');
  }

  getRolBadgeColor(rol: any): string {
    const rolNombre = this.getRolNombre(rol);
    const mapping: { [key: string]: string } = {
      'ROLE_ADMINISTRADOR': 'bg-red-100 text-red-800',
      'ADMIN': 'bg-red-100 text-red-800',
      'ROLE_MODERADOR': 'bg-yellow-100 text-yellow-800',
      'MODERATOR': 'bg-yellow-100 text-yellow-800',
      'ROLE_USUARIO': 'bg-blue-100 text-blue-800',
      'USER': 'bg-blue-100 text-blue-800'
    };
    return mapping[rolNombre] || 'bg-gray-100 text-gray-800';
  }

  getRolDisplay(rol: any): string {
    const rolNombre = this.getRolNombre(rol);
    const mapping: { [key: string]: string } = {
      'ROLE_ADMINISTRADOR': 'Administrador',
      'ADMIN': 'Administrador',
      'ROLE_MODERADOR': 'Moderador',
      'MODERATOR': 'Moderador',
      'ROLE_USUARIO': 'Usuario',
      'USER': 'Usuario'
    };
    return mapping[rolNombre] || 'Usuario';
  }

  cerrarMensaje(): void {
    this.error = null;
    this.successMessage = null;
  }

  contarAdmins(): number {
    return 0;
  }

  contarModerators(): number {
    return 0;
  }

  contarUsuarios(): number {
    return this.usuariosFiltrados.length;
  }
}
