import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: '[app-transaction-row]',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.css']
})
export class TransactionRowComponent implements OnInit {

  @Input() row: Transaction;

  constructor() { }

  ngOnInit(): void {
  }

}
