import { Component, OnInit } from '@angular/core';
import {ExchangeService} from "../../services/exchange.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit  {
  selectedInterval: number = 10;
  selectedTimeZone: string = "Europe/Zurich";

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit() {
    this.exchangeService.selectedInterval$.subscribe((interval) => {
      this.selectedInterval = interval;
    });
    this.exchangeService.selectedTimeZone$.subscribe((timeZone) => {
      this.selectedTimeZone = timeZone;
    });
  }

}
