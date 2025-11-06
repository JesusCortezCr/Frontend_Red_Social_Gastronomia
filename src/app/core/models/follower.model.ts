import { Cliente } from "./user.model";

export interface Seguidor{
    id : number;
    seguidor : Cliente;
    seguido : Cliente;
    fechaSeguimiento : string;
}

//DTO para seguir y dejar de seguir

export interface FollowRequest{
    seguidoId : number;
}

//RESPUESTA CON LISTA DE SEGUIDORES
export interface SeguidoresResponse{
    seguidores : Cliente[];
    totalSeguidores : number;
}

export interface SiguiendoResponse{
    siguiendo : Cliente[];
    totalSiguiendo : number;
}
