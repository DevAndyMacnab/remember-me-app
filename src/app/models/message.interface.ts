export interface GetMessage {
    message: string,
    id:number,
    titulo: string,
    contenido: string,
    tipo: string,
    estado:string
}

export interface PostMessage{
    titulo: string,
    contenido: string,
    tipo: string,
    estado: string

}