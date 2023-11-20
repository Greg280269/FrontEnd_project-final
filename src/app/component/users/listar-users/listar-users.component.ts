import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/model/Users';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-listar-users',
  templateUrl: './listar-users.component.html',
  styleUrls: ['./listar-users.component.css']
})
export class ListarUsersComponent {
  dataSource: MatTableDataSource<Users> = new MatTableDataSource()
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'dni',
    'apellido',
    'email',
    'telefono',
    'enable',
    'accion01',
    'accion02'

  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: UsersService) { }

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
      return "Activado"
    }
    else{
      return "Desactivado"
    }
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

}
