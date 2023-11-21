import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Servicios } from 'src/app/model/Servicios';
import { ServiciosService } from 'src/app/service/servicios.service';

@Component({
  selector: 'app-creaedita-servicios',
  templateUrl: './creaedita-servicios.component.html',
  styleUrls: ['./creaedita-servicios.component.css']
})
export class CreaeditaServiciosComponent implements OnInit{

  idF:number = 0;
  edicion:boolean =false;
  form: FormGroup = new FormGroup({});
  mensaje:string="";
  comp: Servicios = new Servicios ();
  disponibilidades: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Disponible' },
    { value: false, viewValue: 'No disponible' },
  ];
  constructor(
    private ps: ServiciosService,
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
      nombre:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      descripcion:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      costo:['',[Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      estado:['',Validators.required]

    });
  }
  Aceptar(){
    if(this.form.valid){
      this.comp.id=this.form.value.id;
      this.comp.nombre=this.form.value.nombre;
      this.comp.descripcion =this.form.value.descripcion;
      this.comp.costo = this.form.value.costo;
      this.comp.estado = this.form.value.estado;


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
      this.router.navigate(['components/servicios']);
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
          nombre: new FormControl(data.nombre),
          descripcion: new FormControl(data.descripcion),
          costo: new FormControl(data.costo),
          estado: new FormControl(data.estado)
        });
      });
    }
  }

}
