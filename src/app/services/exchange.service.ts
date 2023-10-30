import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private selectedIntervalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  private selectedTimeZoneSubject: BehaviorSubject<string> = new BehaviorSubject<string>("Europe/Zurich");

  selectedInterval$: Observable<number> = this.selectedIntervalSubject.asObservable();
  selectedTimeZone$: Observable<string> = this.selectedTimeZoneSubject.asObservable();

  setSelectedInterval(interval: number) {
    this.selectedIntervalSubject.next(interval);
  }

  setSelectedTimeZone(timeZone: string) {
    this.selectedTimeZoneSubject.next(timeZone);
  }
}
