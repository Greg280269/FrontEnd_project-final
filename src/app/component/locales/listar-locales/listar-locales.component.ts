import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Locales } from 'src/app/model/Locales';
import { LocalesService } from 'src/app/service/locales.service';

@Component({
  selector: 'app-listar-locales',
  templateUrl: './listar-locales.component.html',
  styleUrls: ['./listar-locales.component.css']
})
export class ListarLocalesComponent implements OnInit {
  Lista: Locales[] = [];
  dataSource: MatTableDataSource<Locales> = new MatTableDataSource();
  displayedColumns: string[] = [
    'CodigoLocal',
    'Nombre',
    'Direccion',
    'Capacidad',
    'Usuario',
    'Servicio',
    'accion01',
    'accion02'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private lS: LocalesService) { }

  ngOnInit(): void {
    this.lS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator=this.paginator;
    });
    this.lS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number){
    this.lS.delete(id).subscribe((data)=>{
      this.lS.list().subscribe((data)=>{
        this.lS.setList(data);
      });
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

}

