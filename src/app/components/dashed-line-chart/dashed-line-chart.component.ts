import {Component, Input, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {TimeRange} from "../../models/time-range.model";
import { formatDate } from '@angular/common';
import '@angular/common/locales/global/de';

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
  ApexLegend, ApexOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashed-line-chart',
  templateUrl: './dashed-line-chart.component.html',
})

export class DashedLineChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  chartOptions: Partial<ApexOptions>;
  timeRange: TimeRange;

  constructor(
    private apiService: ApiService
  ) {
    this.setDefaultTimeRange();
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
      },
      title: {
        text: "Global performance",
        align: "center"
      },
      noData: {
        text: 'Loading...'
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        type: "datetime"
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val + " (ms)";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val + "";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
  }

  setDefaultTimeRange() {
    const currentDate = new Date();
    const twentyFourHoursAgo = new Date(currentDate);
    twentyFourHoursAgo.setHours(currentDate.getHours() - 24);

    this.timeRange = {
      from: formatDate(twentyFourHoursAgo, 'yyyy-MM-ddTHH:mm:ss', 'de'),
      to: formatDate(currentDate, 'yyyy-MM-ddTHH:mm:ss', 'de'),
    };
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData(): void {
    this.apiService.postChartData(this.timeRange).subscribe((data) => {
      this.chart.updateSeries(data.series, true)
    });
  }
}
