import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComentariosComponent } from './comentarios/listar-comentarios/listar-comentarios.component';
import { CreaeditaComentariosComponent } from './comentarios/creaedita-comentarios/creaedita-comentarios.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import{MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'
import { ComponentRoutingModule } from './component-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ComprobantepagoComponent } from './comprobantepago/comprobantepago.component';
import { EventosComponent } from './eventos/eventos.component';
import { LocalesComponent } from './locales/locales.component';
import { RolesComponent } from './roles/roles.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { TipocomprobanteComponent } from './tipocomprobante/tipocomprobante.component';
import { UsersComponent } from './users/users.component';
import { ListarComprobantepagoComponent } from './comprobantepago/listar-comprobantepago/listar-comprobantepago.component';
import { CreaeditaComprobantepagoComponent } from './comprobantepago/creaedita-comprobantepago/creaedita-comprobantepago.component';
import { ListarEventosComponent } from './eventos/listar-eventos/listar-eventos.component';
import { CreaeditaEventosComponent } from './eventos/creaedita-eventos/creaedita-eventos.component';
import { ListarLocalesComponent } from './locales/listar-locales/listar-locales.component';
import { CreaeditaLocalesComponent } from './locales/creaedita-locales/creaedita-locales.component';
import { ListarRolesComponent } from './roles/listar-roles/listar-roles.component';
import { CreaeditaRolesComponent } from './roles/creaedita-roles/creaedita-roles.component';
import { ListarServiciosComponent } from './servicios/listar-servicios/listar-servicios.component';
import { CreaeditaServiciosComponent } from './servicios/creaedita-servicios/creaedita-servicios.component';
import { ListarTipocomprobanteComponent } from './tipocomprobante/listar-tipocomprobante/listar-tipocomprobante.component';
import { CreaeditaTipocomprobanteComponent } from './tipocomprobante/creaedita-tipocomprobante/creaedita-tipocomprobante.component';
import { ListarUsersComponent } from './users/listar-users/listar-users.component';
import { CreaeditaUsersComponent } from './users/creaedita-users/creaedita-users.component';
import {MatCardModule} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReporteComponent } from './reporte/reporte.component';
import { Reporte01Component } from './reporte/reporte01/reporte01.component';
import { NgChartsModule } from 'ng2-charts';
import { Reporte02Component } from './reporte/reporte02/reporte02.component';


@NgModule({
  declarations: [
    ListarComentariosComponent,
    CreaeditaComentariosComponent,
    ComentariosComponent,
    ComprobantepagoComponent,
    EventosComponent,
    LocalesComponent,
    RolesComponent,
    ServiciosComponent,
    TipocomprobanteComponent,
    UsersComponent,
    ListarComprobantepagoComponent,
    CreaeditaComprobantepagoComponent,
    ListarEventosComponent,
    CreaeditaEventosComponent,
    ListarLocalesComponent,
    CreaeditaLocalesComponent,
    ListarRolesComponent,
    CreaeditaRolesComponent,
    ListarServiciosComponent,
    CreaeditaServiciosComponent,
    ListarTipocomprobanteComponent,
    CreaeditaTipocomprobanteComponent,
    ListarUsersComponent,
    CreaeditaUsersComponent,
    ReporteComponent,
    Reporte01Component,
    Reporte02Component,
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    MatTableModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    NgChartsModule
  ]
  ,
  providers: [],
  bootstrap: [AppComponent]
})
export class ComponentModule { }
