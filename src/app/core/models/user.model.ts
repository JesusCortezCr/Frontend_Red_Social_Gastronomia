export interface Rol{
    id:number;
    nombre:string;
    descripcion?:string;
    activo:boolean;
}

export interface Usuario{
    id:number;
    correo:string;
    estado:boolean;
    rol : Rol;
    nombre : string;
    apellido : string;
    biografia?: string;
}

export interface Cliente extends Usuario{
    cantidadSeguidores:number;
    cantidadSiguiendo: number;
}

//solicitud Login DTO (Cortez)
export interface LoginRequest{
    correo : string;
    password : string;
}

//respuesta del Login (segun el AuthController)
export interface LoginResponse{
    token: string;
    correo: string;
    rol : string;
}

//solicitud registro cuerpo (Cortez)
export interface RegisterRequest{
    correo: string;
    password: string;
    nombre : string;
    apellido : string;
    biografia?: string;
    rol : {
        id : number;
    }
}

//respuesta de autenticacion (Cortez)
export interface AuthResponse{
    token: string;
    usuario: Cliente;
}

//solicitud de actualizacion de perfil (Cortez)
export interface UpdateProfileRequest{
    nombre?:string;
    apellido?:string;
    biografia? : string;
}