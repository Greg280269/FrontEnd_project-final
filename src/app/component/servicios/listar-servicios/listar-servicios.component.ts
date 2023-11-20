import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Servicios } from 'src/app/model/Servicios';
import { ServiciosService } from 'src/app/service/servicios.service';

@Component({
  selector: 'app-listar-servicios',
  templateUrl: './listar-servicios.component.html',
  styleUrls: ['./listar-servicios.component.css']
})
export class ListarServiciosComponent {
  dataSource: MatTableDataSource<Servicios> = new MatTableDataSource()
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'descripcion',
    'costo',
    'estado',
    'accion01',
    'accion02'


  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: ServiciosService) { }

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

  dispnibilidad(estado:boolean): string{
    if(estado==true){
      return "Disponible"
    }
    else{
      return "No disponible"
    }
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

}
