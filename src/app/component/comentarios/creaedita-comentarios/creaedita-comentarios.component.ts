import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comentarios } from 'src/app/model/Comentarios';
import { Eventos } from 'src/app/model/Eventos';
import { Users } from 'src/app/model/Users';
import { ComentariosService } from 'src/app/service/comentarios.service';
import { EventosService } from 'src/app/service/eventos.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-creaedita-comentarios',
  templateUrl: './creaedita-comentarios.component.html',
  styleUrls: ['./creaedita-comentarios.component.css']
})
export class CreaeditaComentariosComponent implements OnInit{

  idF:number = 0;
  edicion:boolean =false;
  form: FormGroup = new FormGroup({});
  mensaje:string="";
  comentarios: Comentarios = new Comentarios ();
  tipo: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
  ];

  listaUsuario: Users[] = [];
  usuarioSeleccionado:number=0

  listaEvento: Eventos[] = [];
  eventoSeleccionado:number=0

  constructor(
    private es: EventosService,
    private us: UsersService,
    private cS: ComentariosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params)=>{
      this.idF = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form=this.formBuilder.group({
      id: ['',],
      valoracion: ['', Validators.required],
      contenido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      users: ['', Validators.required],
      eventos: ['', Validators.required],

    });
    this.us.list().subscribe((data) => {
      this.listaUsuario = data;
    });
    this.es.list().subscribe((data) => {
      this.listaEvento = data;
    });
  }
  aceptar(){
    if(this.form.valid){
      this.comentarios.id = this.form.value.id;
      this.comentarios.valoracion = this.form.value.valoracion;
      this.comentarios.contenido = this.form.value.contenido;
      this.comentarios.idUsuario.id=this.form.value.users;
      this.comentarios.idEvento.id =this.form.value.eventos;
      if (this.edicion) {
        this.cS.update(this.comentarios).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.comentarios).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['components/comentarios']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo:string): AbstractControl{
    const control = this.form.get(nombreCampo);
    if(!control){
      throw new Error (`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init(){
    if (this.edicion) {
      this.cS.listId(this.idF).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          valoracion: new FormControl(data.valoracion),
          contenido: new FormControl(data.contenido),
          users: new FormControl(data.idUsuario.id),
          eventos: new FormControl(data.idEvento.id),
        });
      });
    }
  }

}
