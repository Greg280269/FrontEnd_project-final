import { Locales } from "./Locales";
import { Users } from "./Users";

export class Eventos {
  id: number = 0;
  idLocal: Locales = new Locales();
  idUsuario: Users = new Users();
  nombre: string = '';
  descripcion: string = '';
  fecha: Date = new Date(Date.now());
  capacidad: number = 0;
  costo: number = 0.0;

}
