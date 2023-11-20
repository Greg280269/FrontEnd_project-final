import { Servicios } from "./Servicios";
import { Users } from "./Users";

export class Locales {
  id: number = 0;
  idUsuario: Users = new Users();
  idServicios: Servicios = new Servicios();
  nombre: string = '';
  direccion: string = '';
  capacidad: number = 0;
}
