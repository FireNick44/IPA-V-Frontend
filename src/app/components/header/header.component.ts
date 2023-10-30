import {Component, EventEmitter, Output} from '@angular/core';
import {ExchangeService} from "../../services/exchange.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    private exchangeService: ExchangeService,
    private snackBar: MatSnackBar
  ) {}
  @Output() openSidenavEvent = new EventEmitter<void>();

  selectedTimeZone: string = "Europe/Zurich";
  timeZones: string[] = [
    "Africa/Nairobi",
    "Asia/Singapore",
    "Europe/Zurich",
    "America/New_York",
    "America/Los_Angeles",
    "Australia/Sydney"
  ];

  openSidenav(): void {
    this.openSidenavEvent.emit();
  }

  setInterval(duration: number) {
    this.exchangeService.setSelectedInterval(duration);
    this.openSnackBar('Duration selected', `You selected ${duration} seconds`);
  }

  setSelectTimeZone(timeZone: string) {
    this.exchangeService.setSelectedTimeZone(timeZone);
    this.openSnackBar('Timezone selected', `You selected ${timeZone}`);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
