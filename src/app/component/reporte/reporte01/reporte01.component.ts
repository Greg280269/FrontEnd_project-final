import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ServiciosService } from 'src/app/service/servicios.service';

@Component({
  selector: 'app-reporte01',
  templateUrl: './reporte01.component.html',
  styleUrls: ['./reporte01.component.css']
})
export class Reporte01Component implements OnInit{

  barCharOptions: ChartOptions = {
    responsive: true
  };
  barChartLabel: string[] = []
  barChartType: ChartType = 'bar'
  barCharLegend = true
  barChartData: ChartDataset[] = []
  barChartData2: ChartDataset[] = []
  constructor(private eS:ServiciosService){}

  ngOnInit(): void {
    this.eS.getSuma().subscribe((data) => {
      this.barChartLabel = data.map(item => item.nameServiceDisp);
      this.barChartData = [
        {
          data: data.map(item => item.quanttiyByServiceDisp),
          label: 'Precio de Servicio',
          backgroundColor:'rgba(255,0,0,0.7)'
        }
      ]
    })
  }
  
}
