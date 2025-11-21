export interface LoginResponse{
    token : string;
    correo : string;
    rol : string;

}
export interface LoginRequest{
    correo : string;
    password : string;
}