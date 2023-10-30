import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Transaction} from "../../models/transaction.model";
import {ApiService} from "../../services/api.service";
import {MatPaginator} from "@angular/material/paginator";
import {PaginatedRequest} from "../../models/paginated-request.model";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
})
export class TransactionComponent implements OnInit {
  dataSource = new MatTableDataSource<Transaction>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'timestamp',
    'senderServerLocation',
    'memoryUsage',
    'processingTime',
  ];
  paginatedRequest: PaginatedRequest = {
    minId: null,
    maxId: null,
    requestedResults: 10,
  };
  totalTransactions: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getPaginatedData();
  }

  changePage(event: any) {
    this.paginatedRequest.requestedResults = event.pageSize;

    const pageSize = this.paginatedRequest.requestedResults;
    const startIndex = (this.totalTransactions - (event.pageIndex + 1) * pageSize) + 1;
    const endIndex = startIndex + pageSize - 1;

    this.paginatedRequest.minId = startIndex;
    this.paginatedRequest.maxId = endIndex;
    this.getPaginatedData();
  }

  getPaginatedData() {
    this.apiService.postPaginatedTransactions(this.paginatedRequest).subscribe((data) => {
      this.totalTransactions = data.totalTransactions;
      this.dataSource.data = data.transactions;
      console.log(data);
    });
  }
}
