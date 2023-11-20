import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Users } from 'src/app/model/Users';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-creaedita-users',
  templateUrl: './creaedita-users.component.html',
  styleUrls: ['./creaedita-users.component.css']
})
export class CreaeditaUsersComponent implements OnInit{

  idF:number = 0;
  edicion:boolean =false;
  form: FormGroup = new FormGroup({});
  mensaje:string="";
  comp: Users = new Users ();

  disponibilidades: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Activado' },
    { value: false, viewValue: 'Desactivado' },
  ];

  constructor(
    private ps: UsersService,
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
      dni:['',[Validators.required, Validators.minLength(8),Validators.maxLength(8),Validators.pattern(/^[0-9]+$/)]],
      username:['',Validators.required],
      apellido:['',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]],
      email:['', [Validators.required, Validators.email]],
      telefono:['',[Validators.required, Validators.minLength(9),Validators.maxLength(9),Validators.pattern(/^[0-9]+$/)]],
      enabled:['',Validators.required],
      password:['',Validators.required],

    });
  }
  Aceptar(){
    if(this.form.valid){
      this.comp.id=this.form.value.id;
      this.comp.dni=this.form.value.dni;
      this.comp.username =this.form.value.username;
      this.comp.apellido=this.form.value.apellido;
      this.comp.email=this.form.value.email;
      this.comp.telefono =this.form.value.telefono;
      this.comp.enabled=this.form.value.enabled;
      this.comp.password =this.form.value.password;

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
      this.router.navigate(['components/users']);
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
          username: new FormControl(data.username),
          apellido: new FormControl(data.apellido),
          email: new FormControl(data.email),
          password: new FormControl(data.password),
          telefono: new FormControl(data.telefono),
          dni: new FormControl(data.dni),
          enabled: new FormControl(data.enabled),
        });
      });
    }
  }
}

