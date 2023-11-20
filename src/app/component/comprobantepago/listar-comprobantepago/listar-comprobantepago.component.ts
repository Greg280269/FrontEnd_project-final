import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ComprobantePago } from 'src/app/model/ComprobantePago';
import { ComprobantepagoService } from 'src/app/service/comprobantepago.service';

@Component({
  selector: 'app-listar-comprobantepago',
  templateUrl: './listar-comprobantepago.component.html',
  styleUrls: ['./listar-comprobantepago.component.css']
})
export class ListarComprobantepagoComponent {
  dataSource: MatTableDataSource<ComprobantePago> = new MatTableDataSource()
  displayedColumns: string[] = [
    'codigo',
    'monto',
    'fecha',
    'metodo',
    'ruc',
    'igv',
    'tipo',
    'evento',
    'accion01',
    'accion02'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private pS: ComprobantepagoService) { }

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator=this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number){
    this.pS.delete(id).subscribe((data)=>{
      this.pS.list().subscribe((data)=>{
        this.pS.setList(data);
      });
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
}
