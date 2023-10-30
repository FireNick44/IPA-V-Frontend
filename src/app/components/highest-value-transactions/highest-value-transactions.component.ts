import {Component, OnInit} from '@angular/core';
import {HighestValueTransaction} from "../../models/highest-value-transaction.model";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-highest-value-transactions',
  templateUrl: './highest-value-transactions.component.html',
})
export class HighestValueTransactionsComponent implements OnInit {
  highestValueTransactions: HighestValueTransaction[] = [];
  constructor(private apiService: ApiService) {}
  statistics: any[] = [];

  ngOnInit() {
    this.loadHighestValueTransactions();
  }

  loadHighestValueTransactions() {
    this.apiService.getHighestValueTransactions().subscribe(data => {
      this.highestValueTransactions = data;
      this.createStats();
    });
  }

  createStats() {
    this.statistics = [
      {
        name: 'Highest Amount',
        value: this.highestValueTransactions[0]?.transaction.amount,
        id: this.highestValueTransactions[0]?.transaction.id,
      },
      {
        name: 'Highest Processing Time',
        value: this.highestValueTransactions[1]?.transaction.processingTime,
        id: this.highestValueTransactions[1]?.transaction.id,
      },
      {
        name: 'Highest Memory Usage',
        value: this.highestValueTransactions[2]?.transaction.memoryUsage,
        id: this.highestValueTransactions[2]?.transaction.id,
      },
    ];
  }
}
