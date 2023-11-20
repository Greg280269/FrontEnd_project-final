import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Roles } from 'src/app/model/Roles';
import { Users } from 'src/app/model/Users';
import { RolesService } from 'src/app/service/roles.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-creaedita-roles',
  templateUrl: './creaedita-roles.component.html',
  styleUrls: ['./creaedita-roles.component.css']
})
export class CreaeditaRolesComponent implements OnInit{
  idF:number = 0;
  edicion:boolean =false;
  form: FormGroup = new FormGroup({});
  mensaje:string="";
  comp: Roles = new Roles ();
  roles: { value: string; viewValue: string }[] = [
    { value: 'PROPIETARIO', viewValue: 'PROPIETARIO' },
    { value: 'ASISTENTE', viewValue: 'ASISTENTE' },
    { value: 'ADMIN', viewValue: 'ADMIN' },
  ];
  listaPersonas: Users[] = [];
  idPersonaSeleccionada:number=0
  constructor(
    private as: UsersService,
    private ps: RolesService,
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
      id:['',],
      rol:['',Validators.required],
      person:['',Validators.required],
    });

    this.as.list().subscribe((data) => {
      this.listaPersonas = data;
    });
  }
  Aceptar(){
    if(this.form.valid){
      this.comp.id=this.form.value.id;
      this.comp.rol=this.form.value.rol;
      this.comp.idUsuario.id =this.form.value.person;



      if(this.edicion){
        this.ps.update(this.comp).subscribe(()=>{
          this.ps.list().subscribe((data)=>{
            this.ps.setList(data);
          });
        });

      }else{
        this.ps.insert(this.comp).subscribe((data)=>{
          this.ps.list().subscribe((data)=>{
            this.ps.setList(data);
          });
        });
      }
      this.router.navigate(['components/roles']);
    } else{
      this.mensaje='Complete todos los campos, revise!!';
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
      this.ps.listId(this.idF).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          rol: new FormControl(data.rol),
          person: new FormControl(data.idUsuario),

        });
      });
    }
  }
}
