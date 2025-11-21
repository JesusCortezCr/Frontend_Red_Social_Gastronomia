export interface RegistroRequest{
    nombre:string;
    apellido:string;
    correo:string;
    password:string;
}
export interface RegistroResponse{
    id:number;
    correo:string;
    nombre:string;
    apellido:string;
    biografia:string;
    rolNombre : string;
    estado: boolean;
}