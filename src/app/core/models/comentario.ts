import { Publicacion } from "./publicacion";
import { Usuario } from "./usuario.model";

// comentario.ts
export interface Comentario {
  id: number;
  contenido: string;
  estadoComentario: boolean;
  cantidadReportes: number;
  fechaCreacion: string;
  usuario: Usuario;
  publicacion?: Publicacion;
  comentarioPadre?: Comentario;
  respuestas: Comentario[];
  cantidadRespuestas: number;
  editando?: boolean;
  contenidoEditado?: string;
  mostrandoRespuestas?: boolean;
}