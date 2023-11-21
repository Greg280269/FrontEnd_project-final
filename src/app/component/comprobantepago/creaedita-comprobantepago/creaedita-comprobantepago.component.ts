import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComprobantePago } from 'src/app/model/ComprobantePago';
import { TipoComprobante } from 'src/app/model/TipoComprobante';
import { ComprobantepagoService } from 'src/app/service/comprobantepago.service';
import { TipocomprobanteService } from 'src/app/service/tipocomprobante.service';
import * as moment from 'moment';
import { Eventos } from 'src/app/model/Eventos';
import { EventosService } from 'src/app/service/eventos.service';

@Component({
  selector: 'app-creaedita-comprobantepago',
  templateUrl: './creaedita-comprobantepago.component.html',
  styleUrls: ['./creaedita-comprobantepago.component.css']
})
export class CreaeditaComprobantepagoComponent implements OnInit{
  idF:number = 0;
  edicion:boolean =false;
  form: FormGroup = new FormGroup({});
  mensaje:string="";
  comp: ComprobantePago = new ComprobantePago ();

  maxFecha: Date = moment().add(-1, 'days').toDate();

  listaTipoComprobante: TipoComprobante[] = [];
  idTipoComprobanteSeleccionado:number=0

  listaEvento: Eventos[] = [];
  idEventoSeleccionado:number=0

  constructor(
    private es: EventosService,
    private as: TipocomprobanteService,
    private ps: ComprobantepagoService,
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
      monto:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      fecha:['',Validators.required],
      metodo:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      ruc:['',[Validators.required,Validators.pattern(/^[0-9]+$/),Validators.minLength(10),,Validators.maxLength(10)]],
      igv:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      tipo:['',Validators.required],
      eventos:['',Validators.required]

    });
    this.as.list().subscribe((data) => {
      this.listaTipoComprobante = data;
    });
    this.es.list().subscribe((data) => {
      this.listaEvento = data;
    });

  }

  Aceptar(){
    if(this.form.valid){
      this.comp.id=this.form.value.id;
      this.comp.monto=this.form.value.monto;
      this.comp.fecha =this.form.value.fecha;
      this.comp.metodo=this.form.value.metodo;
      this.comp.ruc=this.form.value.ruc;
      this.comp.igv =this.form.value.igv;
      this.comp.idTipoComprobante.id=this.form.value.tipo;
      this.comp.idEvento.id =this.form.value.eventos;


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
      this.router.navigate(['components/comprobantePago']);
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
          monto: new FormControl(data.monto),
          fecha: new FormControl(data.fecha),
          metodo: new FormControl(data.metodo),
          ruc: new FormControl(data.ruc),
          igv: new FormControl(data.igv),
          tipo: new FormControl(data.idTipoComprobante.id),
          eventos: new FormControl(data.idEvento.id),
        });
      });
    }
  }
}
