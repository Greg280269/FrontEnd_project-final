import { Eventos } from "./Eventos";
import { TipoComprobante } from "./TipoComprobante";

export class ComprobantePago {
  id: number = 0;
  idEvento: Eventos = new Eventos();
  idTipoComprobante: TipoComprobante = new TipoComprobante();
  metodo: string = '';
  fecha: Date = new Date(Date.now());
  ruc: string = '';
  igv: number = 0;
  monto: number = 0;

}
