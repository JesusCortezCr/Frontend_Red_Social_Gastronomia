export interface Categoria{
    id : number;
    nombre : string;
    descripcion? : string;
    activo : boolean ;
}

//DTO para crear categoria
export interface CreateCategoriaRequest{
    nombre: string;
    descripcion?: string;
    activo : boolean;
}

