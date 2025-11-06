import { Usuario } from "./user.model";

export interface Comentario{
    id: number;
    contenido : string;
    estadoComentario : boolean;
    cantidadReportes : number;
    fechaCreacion : string;
    publicacionId? : number;
    comentarioPadre?: Comentario;
    respuestas : Comentario[];
    cantidadRespuestas : number;
    usuario : Usuario;
}

//DTO para crear comentario
export interface CreateComentarioRequest{
    contenido : string;
    publicacionId: number;
    comentarioPadreId?: number;
}

//DTO para reportar comentario
export interface ReportComentarioRequest{
    motivoReporte : string;
}