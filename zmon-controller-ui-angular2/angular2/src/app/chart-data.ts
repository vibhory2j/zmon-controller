interface ChartDataPoint {
  readonly ts: number;
  readonly td: number;
  readonly value: Object;
}

export class ChartData {
  entity: string;
  results: Array<ChartDataPoint>;
}
