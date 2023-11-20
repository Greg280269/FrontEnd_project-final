import { Eventos } from "./Eventos";
import { Users } from "./Users";

export class Comentarios {
  id:number=0
  idUsuario:Users = new Users();
  idEvento:Eventos = new Eventos();
  valoracion:number=0
  contenido:string=""
}
