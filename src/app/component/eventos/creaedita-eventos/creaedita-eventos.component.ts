import { Component, OnInit } from '@angular/core';
import * as moment  from 'moment'
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Eventos } from 'src/app/model/Eventos';
import { EventosService } from 'src/app/service/eventos.service';
import { Users } from 'src/app/model/Users';
import { Locales } from 'src/app/model/Locales';
import { UsersService } from 'src/app/service/users.service';
import { LocalesService } from 'src/app/service/locales.service';

@Component({
  selector: 'app-creaedita-eventos',
  templateUrl: './creaedita-eventos.component.html',
  styleUrls: ['./creaedita-eventos.component.css']
})
export class CreaeditaEventosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  evento: Eventos = new Eventos();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;

  listaUsuario: Users[] = [];
  usuarioSeleccionado:number=0

  listaLocal: Locales[] = [];
  localSeleccionado:number=0

  constructor(
    private us: UsersService,
    private ls: LocalesService,
    private eS: EventosService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id= data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      id: ['',],
      nombre: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      descripcion: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      fecha: ['', Validators.required],
      capacidad: ['', [Validators.required,Validators.pattern(/^[0-9]+$/),Validators.min(10),Validators.max(1000)]],
      costo: ['', [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      users: ['', Validators.required],
      locales: ['', Validators.required],
    });
    this.us.list().subscribe((data) => {
      this.listaUsuario = data;
    });
    this.ls.list().subscribe((data) => {
      this.listaLocal = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.evento.id = this.form.value.id;
      this.evento.nombre = this.form.value.nombre;
      this.evento.descripcion = this.form.value.descripcion;
      this.evento.fecha = this.form.value.fecha;
      this.evento.capacidad = this.form.value.capacidad;
      this.evento.costo = this.form.value.costo;
      this.evento.idUsuario.id = this.form.value.users;
      this.evento.idLocal.id = this.form.value.locales;
      if (this.edicion) {
        this.eS.update(this.evento).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      } else {
        this.eS.insert(this.evento).subscribe((data) => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
      this.router.navigate(['components/eventos']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
          descripcion: new FormControl(data.descripcion),
          fecha: new FormControl(data.fecha),
          capacidad: new FormControl(data.capacidad),
          costo: new FormControl(data.costo),
          users: new FormControl(data.idUsuario.id),
          locales: new FormControl(data.idLocal.id),

        });
      });
    }
  }
}

