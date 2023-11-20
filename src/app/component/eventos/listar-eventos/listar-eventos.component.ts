import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Eventos } from 'src/app/model/Eventos';
import { EventosService } from 'src/app/service/eventos.service';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent {
  dataSource: MatTableDataSource<Eventos> = new MatTableDataSource()
  displayedColumns: string[] = [
    'Codigo',
    'Nombre',
    'Descripcion',
    'Fecha',
    'Capacidad',
    'Costo',
    'Usuario',
    'Local',
    'accion01',
    'accion02'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private eS: EventosService) { }

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator=this.paginator;
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number){
    this.eS.delete(id).subscribe((data)=>{
      this.eS.list().subscribe((data)=>{
        this.eS.setList(data);
      });
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }


}
