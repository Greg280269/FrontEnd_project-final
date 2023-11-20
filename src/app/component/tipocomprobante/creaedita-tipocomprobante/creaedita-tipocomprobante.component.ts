import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoComprobante } from 'src/app/model/TipoComprobante';
import { TipocomprobanteService } from 'src/app/service/tipocomprobante.service';

@Component({
  selector: 'app-creaedita-tipocomprobante',
  templateUrl: './creaedita-tipocomprobante.component.html',
  styleUrls: ['./creaedita-tipocomprobante.component.css']
})
export class CreaeditaTipocomprobanteComponent implements OnInit{

  idF:number = 0;
  edicion:boolean =false;
  form: FormGroup = new FormGroup({});
  mensaje:string="";
  comp: TipoComprobante = new TipoComprobante ();
  constructor(
    private ps: TipocomprobanteService,
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
      nombre:['',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]],
      descripcion:['',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]],

    });
  }
  Aceptar(){
    if(this.form.valid){
      this.comp.id=this.form.value.id;
      this.comp.nombre=this.form.value.nombre;
      this.comp.descripcion =this.form.value.descripcion;


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
      this.router.navigate(['components/tipoComprobante']);
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
        });
      });
    }
  }

}
