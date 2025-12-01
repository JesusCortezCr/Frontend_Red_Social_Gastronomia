export interface Usuario {
  id: number | string;
  nombre: string;
  apellido: string;
  correo?: string;
  email?: string;
  biografia?: string;
  estado?: boolean;
  bloqueado?: boolean;
  fechaCreacion?: Date | string;
  rol: Rol | string | 'ADMIN' | 'MODERATOR' | 'USER' | 'ROLE_USUARIO' | 'ROLE_ADMINISTRADOR' | 'ROLE_MODERADOR';
  rol_id?: number;
  rolId?: number;
}

export interface Rol {
  id: number;
  nombre: string;
}
