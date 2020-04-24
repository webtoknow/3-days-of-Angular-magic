import { Component, OnInit } from '@angular/core';
import { TradeService } from 'src/app/services/trade.service';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(
    private tradeService: TradeService
  ) { }

  ngOnInit(): void {
    this.getTransactionsFromServer();
  }

  getTransactionsFromServer() : void {
    this.tradeService.getTransactions()
      .subscribe(response => {
        this.transactions = response;
        console.log('transactions', this.transactions)
      })
  }

}
