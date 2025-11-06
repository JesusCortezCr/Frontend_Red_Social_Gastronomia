
//para respuestas genericas con exito
export interface ApiResponse<T=any>{
    succes: boolean;
    message : string;
    data?: T;
}

//para errores de validacion 
export interface ValidationError{
    field: string;
    message : string;
}

export interface ErrorResponse{
    timestamp: string;
    status : number;
    error : string;
    message : string;
    path : string;
    validationErrors?: ValidationError[];
}

