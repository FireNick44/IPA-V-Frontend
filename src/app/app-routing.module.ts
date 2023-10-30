import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {TransactionComponent} from "./views/transaction/transaction.component";
import {OverviewComponent} from "./views/overview/overview.component";
import {TransactionDetailComponent} from "./views/transaction-detail/transaction-detail.component";

const routes: Routes = [
  {
    component: OverviewComponent,
    path: '',
    title: 'Overview'
  },
  {
    component: DashboardComponent,
    path: 'dashboard',
    title: 'Dashboard'
  },
  {
    component: TransactionComponent,
    path: 'transaction',
    title: 'Transaction'
  },
  {
    component: TransactionDetailComponent,
    path: 'transaction/:id',
    title: 'Transaction Detail'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
