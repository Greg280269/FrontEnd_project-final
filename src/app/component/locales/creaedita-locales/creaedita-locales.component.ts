import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Locales } from 'src/app/model/Locales';
import { LocalesService } from 'src/app/service/locales.service';
import { Servicios } from 'src/app/model/Servicios';
import { Users } from 'src/app/model/Users';
import { UsersService } from 'src/app/service/users.service';
import { ServiciosService } from 'src/app/service/servicios.service';


@Component({
  selector: 'app-creaedita-locales',
  templateUrl: './creaedita-locales.component.html',
  styleUrls: ['./creaedita-locales.component.css']
})
export class CreaeditaLocalesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  local: Locales = new Locales();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;

  listaUsuario: Users[] = [];
  usuarioSeleccionado:number=0

  listaServicio: Servicios[] = [];
  servicioSeleccionado:number=0

  constructor(
    private us: UsersService,
    private ss: ServiciosService,
    private lS: LocalesService,
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
      nombre: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]],
      direccion: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]],
      capacidad: ['', [Validators.required,Validators.pattern(/^[0-9]+$/),Validators.min(10),Validators.max(1000)]],
      users: ['', Validators.required],
      servicios: ['', Validators.required],
    });

    this.us.list().subscribe((data) => {
      this.listaUsuario = data;
    });
    this.ss.list().subscribe((data) => {
      this.listaServicio = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.local.id = this.form.value.id;
      this.local.nombre = this.form.value.nombre;
      this.local.direccion = this.form.value.direccion;
      this.local.capacidad = this.form.value.capacidad;
      this.local.idUsuario.id = this.form.value.users;
      this.local.idServicios.id = this.form.value.servicios;
      if (this.edicion) {
        this.lS.update(this.local).subscribe(() => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
      } else {
        this.lS.insert(this.local).subscribe((data) => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
      }
      this.router.navigate(['components/locales']);
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

  //actualizar
  init() {
    if (this.edicion) {
      this.lS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
          direccion: new FormControl(data.direccion),
          capacidad: new FormControl(data.capacidad),
          users: new FormControl(data.idUsuario.id),
          servicios: new FormControl(data.idServicios.id),

        });
      });
    }
  }


}
