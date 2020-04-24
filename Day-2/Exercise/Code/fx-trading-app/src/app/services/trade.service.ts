import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(
    private http: HttpClient
  ) { }

  getTransactions() {
    return this.http.get('http://localhost:3000/transactions') as Observable<Transaction[]>
  }
}
