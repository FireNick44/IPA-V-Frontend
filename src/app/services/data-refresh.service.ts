import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DataRefreshService {
  constructor(
    private apiService: ApiService
  ) {}

  refreshDataAtInterval(intervalInSeconds: number, apiFunction: () => Observable<any>): Observable<any> {
    return interval(intervalInSeconds * 1000).pipe(
      switchMap(() => {
        return apiFunction();
      })
    );
  }
}
