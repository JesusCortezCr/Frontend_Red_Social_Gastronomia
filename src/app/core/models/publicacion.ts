import { Comentario } from './comentario';
import { Image } from './image';

export interface Publicacion {
  id: number;
  titulo: string;
  descripcion: string;
  estado: boolean;
  calificacion: number;
  fechaCreacion: string;
  fechaActualizacion: string;
  usuario: {
    id: number;
    nombre: string;
    correo: string;
  };
  categoria: {
    id: number;
    nombre: string;
  };
  image: {
    id: number;
    name: string;
    imageUrl: string;
    imageId: string;
  } | null;
  cantidadLikes?: number;
  cantidadDislikes?: number;
  comentarios: Comentario[];
}

export interface PublicacionRequest {
  titulo: string;
  descripcion: string;
  categoriaId: number;
}
