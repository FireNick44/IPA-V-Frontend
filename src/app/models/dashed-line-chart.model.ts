export interface ChartData {
  series: ChartSeries[];
}

export interface ChartSeries {
  name: string;
  data: [any, any][];
}
