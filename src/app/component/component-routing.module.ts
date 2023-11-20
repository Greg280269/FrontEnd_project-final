import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreaeditaComentariosComponent } from './comentarios/creaedita-comentarios/creaedita-comentarios.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ComprobantePago } from '../model/ComprobantePago';
import { CreaeditaComprobantepagoComponent } from './comprobantepago/creaedita-comprobantepago/creaedita-comprobantepago.component';
import { EventosComponent } from './eventos/eventos.component';
import { CreaeditaEventosComponent } from './eventos/creaedita-eventos/creaedita-eventos.component';
import { LocalesComponent } from './locales/locales.component';
import { CreaeditaLocalesComponent } from './locales/creaedita-locales/creaedita-locales.component';
import { RolesComponent } from './roles/roles.component';
import { CreaeditaRolesComponent } from './roles/creaedita-roles/creaedita-roles.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { CreaeditaServiciosComponent } from './servicios/creaedita-servicios/creaedita-servicios.component';
import { CreaeditaTipocomprobanteComponent } from './tipocomprobante/creaedita-tipocomprobante/creaedita-tipocomprobante.component';
import { UsersComponent } from './users/users.component';
import { CreaeditaUsersComponent } from './users/creaedita-users/creaedita-users.component';
import { TipocomprobanteComponent } from './tipocomprobante/tipocomprobante.component';
import { ComprobantepagoComponent } from './comprobantepago/comprobantepago.component';
import { ReporteComponent } from './reporte/reporte.component';
import { Reporte02Component } from './reporte/reporte02/reporte02.component';

const routes: Routes = [
  {
    path: 'comentarios',
    component:ComentariosComponent,
    children:[
      {path:'nuevo',component:CreaeditaComentariosComponent},
      {path:'ediciones/:id',component:CreaeditaComentariosComponent}
    ]
  },
  {
    path: 'comprobantePago',
    component:ComprobantepagoComponent,
    children:[
      {path:'nuevo',component:CreaeditaComprobantepagoComponent},
      {path:'ediciones/:id',component:CreaeditaComprobantepagoComponent}
    ]
  },
  {
    path: 'eventos',
    component:EventosComponent,
    children:[
      {path:'nuevo',component:CreaeditaEventosComponent},
      {path:'ediciones/:id',component:CreaeditaEventosComponent}
    ]
  },
  {
    path: 'locales',
    component:LocalesComponent,
    children:[
      {path:'nuevo',component:CreaeditaLocalesComponent},
      {path:'ediciones/:id',component:CreaeditaLocalesComponent}
    ]
  },
  {
    path: 'roles',
    component:RolesComponent,
    children:[
      {path:'nuevo',component:CreaeditaRolesComponent},
      {path:'ediciones/:id',component:CreaeditaRolesComponent}
    ]
  },
  {
    path: 'servicios',
    component:ServiciosComponent,
    children:[
      {path:'nuevo',component:CreaeditaServiciosComponent},
      {path:'ediciones/:id',component:CreaeditaServiciosComponent}
    ]
  },
  {
    path: 'tipoComprobante',
    component:TipocomprobanteComponent,
    children:[
      {path:'nuevo',component:CreaeditaTipocomprobanteComponent},
      {path:'ediciones/:id',component:CreaeditaTipocomprobanteComponent}
    ]
  },
  {
    path: 'users',
    component:UsersComponent,
    children:[
      {path:'nuevo',component:CreaeditaUsersComponent},
      {path:'ediciones/:id',component:CreaeditaUsersComponent}
    ]
  },
  {
    path: 'reportes',
    component: ReporteComponent,
    children:[
      {path:'reporte02',component:Reporte02Component}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
