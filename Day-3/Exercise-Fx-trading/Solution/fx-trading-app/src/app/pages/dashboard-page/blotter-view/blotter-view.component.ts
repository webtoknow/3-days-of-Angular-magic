import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { TradeService } from '../../../services/trade.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-blotter-view',
  templateUrl: './blotter-view.component.html',
  styleUrls: ['./blotter-view.component.css']
})
export class BlotterViewComponent implements OnInit {

  public filter = {
    ccyPair: '',
    date: ''
  };

  private unsubscribe = new Subject();
  public transactions: Transaction[] = [];
  private initialTransactions: Transaction[] = [];
  public currenciesPairs: string[] = [];

  constructor(
    private tradeService: TradeService
  ) { }

  ngOnInit() {
    this.startPolling();
  }


  startPolling(): void {
    this.tradeService.getTransactionsPolling()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(response => {
        // Create transaction transform list by adding ccyPair
        const transactionsWithCcyPair: Transaction[] = response
          .map(transaction => ({ ...transaction, ccyPair: `${transaction.primaryCcy}/${transaction.secondaryCcy}` }))
        this.transactions = transactionsWithCcyPair;
        this.initialTransactions = [...transactionsWithCcyPair];
        // Get all Ccy pairs for select
        this.currenciesPairs = this.transactions
          .map(transaction => transaction.ccyPair)
          .filter((x, i, a) => x && a.indexOf(x) === i);
        this.filterBy();
      });
  }

  getDateWithoutHourAndMinuteAndSeconds(date) {
    return new Date(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDay());
  }

  filterBy(): void {
    this.transactions = this.initialTransactions
      .filter(transaction =>
        this.filter.ccyPair && transaction.ccyPair === this.filter.ccyPair || !this.filter.ccyPair)
      .filter(transaction =>
        this.filter.date && this.getDateWithoutHourAndMinuteAndSeconds(transaction.date).getTime() === this.getDateWithoutHourAndMinuteAndSeconds(this.filter.date).getTime() || !this.filter.date)
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}