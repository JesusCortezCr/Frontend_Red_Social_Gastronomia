export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  biografia?: string;
  estado: boolean;
  rol: Rol;
}

export interface Rol {
  id: number;
  nombre: string;
}
