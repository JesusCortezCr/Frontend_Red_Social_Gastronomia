export interface LoginResponse{
    token : string;
    correo : string;
    rol : string;
    id:number;

}
export interface LoginRequest{
    correo : string;
    password : string;
}