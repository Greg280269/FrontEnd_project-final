import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoComprobante } from 'src/app/model/TipoComprobante';
import { TipocomprobanteService } from 'src/app/service/tipocomprobante.service';

@Component({
  selector: 'app-listar-tipocomprobante',
  templateUrl: './listar-tipocomprobante.component.html',
  styleUrls: ['./listar-tipocomprobante.component.css']
})
export class ListarTipocomprobanteComponent {
  dataSource: MatTableDataSource<TipoComprobante> = new MatTableDataSource()
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'descripcion',
    'accion01',
    'accion02'

  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: TipocomprobanteService) { }

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
