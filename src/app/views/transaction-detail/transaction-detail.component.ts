import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Transaction} from "../../models/transaction.model";
import {ApiService} from "../../services/api.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
})
export class TransactionDetailComponent implements OnInit{
  dataSource: MatTableDataSource<Transaction>;
  displayedColumns: string[] = [
    'id',
    'timestamp',
    'amount',
    'memoryUsage',
    'processingTime',
    'senderServerLocation',
    'receiverServerLocation',
    'senderAccountNumber',
    'receiverAccountNumber',
  ];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.dataSource = new MatTableDataSource<Transaction>([]);
  }


  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.route.params.subscribe(params => {
      const transactionId = +params['id'];
      this.apiService.getTransactionById(transactionId).subscribe(data => {
        if (data) {
          this.dataSource = new MatTableDataSource<Transaction>([data]);
        }
      });
    })
  }
}
