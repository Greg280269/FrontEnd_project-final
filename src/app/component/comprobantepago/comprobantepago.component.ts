import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-comprobantepago',
  templateUrl: './comprobantepago.component.html',
  styleUrls: ['./comprobantepago.component.css']
})
export class ComprobantepagoComponent {
  constructor(public route:ActivatedRoute){}
}
