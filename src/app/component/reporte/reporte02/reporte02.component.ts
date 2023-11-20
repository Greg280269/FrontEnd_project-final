import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ComentariosService } from 'src/app/service/comentarios.service';

@Component({
  selector: 'app-reporte02',
  templateUrl: './reporte02.component.html',
  styleUrls: ['./reporte02.component.css']
})
export class Reporte02Component implements OnInit{

barCharOptions: ChartOptions = {
    responsive: true
  };
  barChartLabel: string[] = []
  barChartType: ChartType = 'bar'
  barCharLegend = true
  barChartData: ChartDataset[] = []
  barChartData2: ChartDataset[] = []
  constructor(private eS:ComentariosService){}

  ngOnInit(): void {
    this.eS.getSuma().subscribe((data) => {
      this.barChartLabel = data.map(item => item.usernameCom);
      this.barChartData = [
        {
          data: data.map(item => item.contador),
          label: 'Usuarios x Comentarios',
          backgroundColor:'rgba(255,0,0,0.7)'
        }
      ]
    })
  }
}
