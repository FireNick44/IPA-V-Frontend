import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import {ExchangeService} from "../../services/exchange.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent {
  @ViewChild('svgElement') svgElement: ElementRef;

  constructor(
    private router: Router,
    private exchangeService: ExchangeService,
    private snackBar: MatSnackBar
  ) {
  }

  selectTimeZone(timeZone: string): void {
    this.exchangeService.setSelectedTimeZone(timeZone);
    this.openSnackBar('Timezone selected', `You selected ${timeZone}`);
    this.router.navigate(['/dashboard']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  ngAfterViewInit(): void {
    const svgCircles = this.svgElement.nativeElement.querySelectorAll('circle');
    svgCircles.forEach((circle: SVGElement) => {
      circle.addEventListener('click', () => this.selectTimeZone(circle.id));
    });
  }
}

