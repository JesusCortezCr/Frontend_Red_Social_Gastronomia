import { Usuario } from "./user.model";

export enum TipoNotificacion{
    NUEVO_SEGUIDOR = 'NUEVO_SEGUIDOR',
    COMENTARIO = 'COMENTARIO',
    LIKE_PUBLICACION = 'LIKE_PUBLICACION',
    SISTEMA = 'SISTEMA'
}

export interface Notifacion {
    id : number;
    usuarioDestino : Usuario;
    titulo : string;
    mensaje : string;
    tipoNotificacion : TipoNotificacion;
    leida : boolean;
    fechaCreacion : string;
}

//DTO para marcar como leida
export interface MarcarLeidaRequest{
    notificacionId : number;
}
