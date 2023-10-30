import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {TransactionComponent} from './views/transaction/transaction.component';
import {AppRoutingModule} from './app-routing.module';
import {NgApexchartsModule} from "ng-apexcharts";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OverviewComponent} from './views/overview/overview.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {HttpClientModule} from "@angular/common/http";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {DashedLineChartComponent} from './components/dashed-line-chart/dashed-line-chart.component';
import {HighestValueTransactionsComponent} from './components/highest-value-transactions/highest-value-transactions.component';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {TransactionDetailComponent} from './views/transaction-detail/transaction-detail.component';
import {DashedLineChartTimezoneComponent} from './components/dashed-line-chart-timezone/dashed-line-chart-timezone.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    TransactionComponent,
    OverviewComponent,
    DashedLineChartComponent,
    HighestValueTransactionsComponent,
    TransactionDetailComponent,
    DashedLineChartTimezoneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgApexchartsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
