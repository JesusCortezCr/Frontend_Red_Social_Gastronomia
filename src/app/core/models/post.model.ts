import { Usuario } from "./user.model";

export interface Publicacion {
    id : number;
    titulo: string;
    descripcion : string;
    contenido : string;
    imagenUrl?: string;
    estado : boolean ; 
    calificacion? : number;
    fechaCreacion : string;
    fechaActualizacion : string;
    archivo?: string;
    usuario : Usuario;
    categoria : Categoria;
    cantidadLikes : number;
    cantidadDislikes : number;
    comentarios?: Comentario[];
}

//DTO para crear publicacion
export interface CreatePublicacionRequest{
    titulo : string;
    descripcion : string;
    contenido : string ;
    imagenUrl? : string ; 
    categoriaId : number;
    archivo? : string; 
}

export interface UpdatePublicacionRequest{
    titulo?:string;
    descripcion?: string;
    contenido?: string;
    imagenUrl?:string;
    categoriaId?: number;
}

//repuestas con paginacion
export interface PublicacionResponse{
    content: Publicacion[];
    totalElements: number;
    totalPages : number;
    size : number;
    number : number;
}