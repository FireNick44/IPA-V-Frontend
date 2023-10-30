import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApexOptions, ChartComponent} from "ng-apexcharts";
import {TimeRangeTimezone} from "../../models/time-range-timezone.model";
import {ApiService} from "../../services/api.service";
import {formatDate} from "@angular/common";
import {ExchangeService} from "../../services/exchange.service";
import {DataRefreshService} from "../../services/data-refresh.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashed-line-chart-timezone',
  templateUrl: './dashed-line-chart-timezone.component.html',
})
export class DashedLineChartTimezoneComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription | undefined;
  @ViewChild("chart") chart: ChartComponent;
  chartOptions: Partial<ApexOptions>;
  timeRangeTimeZone: TimeRangeTimezone;

  constructor(
    private dataRefreshService: DataRefreshService,
    private apiService: ApiService,
    private exchangeService: ExchangeService,
    private snackBar: MatSnackBar
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
        text: "Filtered performance",
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

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.exchangeService.selectedInterval$.subscribe((interval) => {
      if (this.dataSubscription) {
        this.dataSubscription.unsubscribe();
      }

      this.dataSubscription = this.dataRefreshService.refreshDataAtInterval(interval, () => {
        return this.apiService.postChartDataByTimeZone(this.timeRangeTimeZone);
      }).subscribe((data) => {
        this.chart.updateSeries(data.series, true);
        this.openSnackBar('Data fetched successfully', 'Close');
      });
    });
  }

  setDefaultTimeRange() {
    const currentDate = new Date();
    const twentyFourHoursAgo = new Date(currentDate);
    twentyFourHoursAgo.setHours(currentDate.getHours() - 24);

    this.timeRangeTimeZone = {
      from: formatDate(twentyFourHoursAgo, 'yyyy-MM-ddTHH:mm:ss', 'de'),
      to: formatDate(currentDate, 'yyyy-MM-ddTHH:mm:ss', 'de'),
      timezone: "Europe/Zurich"
    };
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
