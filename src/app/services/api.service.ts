import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TimeRange} from "../models/time-range.model";
import {ChartData} from "../models/dashed-line-chart.model";
import {HighestValueTransaction} from "../models/highest-value-transaction.model";
import {Transaction} from "../models/transaction.model";
import {TimeRangeTimezone} from "../models/time-range-timezone.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {}

  postChartData(timeRange: TimeRange): Observable<ChartData> {
    return this.http.post<ChartData>(this.baseUrl + 'chart-data', timeRange);
  }

  postChartDataByTimeZone(timeRangeTimeZone: TimeRangeTimezone): Observable<ChartData> {
    return this.http.post<ChartData>(this.baseUrl + 'chart-timezone-data', timeRangeTimeZone)
  }

  postPaginatedTransactions(paginatedRequest: any): Observable<any> {
    return this.http.post(this.baseUrl + 'paginated', paginatedRequest);
  }

  getHighestValueTransactions(): Observable<HighestValueTransaction[]> {
    return this.http.get<HighestValueTransaction[]>(this.baseUrl + 'highest');
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(this.baseUrl + 'transaction/' + id);
  }
}
