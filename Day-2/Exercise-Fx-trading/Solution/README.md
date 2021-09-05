# Day 2 - Exercises - Solution

## Table of contents

- [Exercise 0 - Configuration](#exercise-0---configuration)
  - [Download all npm dependencies](#download-all-npm-dependencies)
  - [Install and use JSON Server](#install-and-use-json-server)
- [Exercise 1 - Create blotter-view, fx-rates-view and widget components](#exercise-1---create-blotter-view-fx-rates-view-and-widget-components)

- [Exercise 2 - Blotter View page](#exercise-2---blotter-view-page)
  - [Transaction model](#transaction-model)
  - [Constants file](#constants-file)
  - [Trade service](#trade-service)
  - [Update Application Module](#update-application-module)
  - [Implement polling mechanism](#implement-polling-mechanism)
  - [Blotter View component](#blotter-view-component)
- [Exercise 3 - FX Rates View page](#exercise-3---fx-rates-view-page)
  - [Rate model](#rate-model)
  - [Widget model](#widget-model)
  - [Update Trade service](#update-trade-service)
  - [Widget component](#widget-component)
  - [FX Rates View component](#fx-rates-view-component)

## Exercise 0 - Configuration

### Download all npm dependencies

- go to *Day-2\Exercise\Code\fx-trading-app*:

    ```bash
    cd 3-Days-of-Angular-magic\Day-2\Exercise\Code\fx-trading-app
    ```

- run *npm install* to download all dependencies:

    ```bash
    npm install
    ```

### Install and use JSON Server

- because we do not have a backend server and a link to a real database at this moment, we will simulate having some data using *JSON Server*
- the first step is to install it (globally), using the following command:

    ```bash
    npm install json-server -g
    ```

- next, we have to start it with the 2 existing files - containing *quote* and *trade* data
- make sure you are in the following path, where both JSON files are situated: *Day-2/Exercise/Code/fx-trading-app*
- run these commands in separate terminal windows:

    ```bash
    json-server --watch db.trade.json --port 8210
    json-server --watch db.quote.json --port 8220
    ```

## Exercise 1 - Create blotter-view, fx-rates-view and widget components

- from design mockup, we can see that it can be divided in 2 big sections: **FX Rates View** and **Blotter View**. Also, the first one contains many widgets looking the same, so this can be also splitted into **Widget** components
- so, *dashboard-page* component will use 3 smaller components which will need to be created:
  - *blotter-view*
  - *fx-rates-view*
  - *widget*

- use CLI to create these 3 new components as children of *dashboard-page*:

    ```bash
    cd src\app\pages\dashboard-page
    ng generate component blotter-view
    ng generate component fx-rates-view
    ng generate component widget
    ```

- because we used Angular CLI, we can observe that also *app.module.ts* was updated with the new components
- in the design, we can see on the top of the dashboard a navbar, containing the logo and *Logout* button
- next step is to include into *dashboard-page* component the navbar, *blotter-view* and *fx-rates-view* and also use *bootstrap* to place them
- so, in *dashboard-page.component.html* we will have:

    ```HTML
    <!-- Navigation -->
    <header>
        <nav class="navbar">
            <img class="fx-main-logo" alt="fx-main-logo" src="./assets/img/logo-main.svg">
            <a href="#" class="btn btn-logout">Log out</a>
        </nav>
    </header>

    <div class="dashboard-container">
        <div class="row">
            <div class="col-sm">
            <app-fx-rates-view></app-fx-rates-view>
            </div>
            <div class="col-sm">
            <app-blotter-view></app-blotter-view>
            </div>
        </div>
    </div>
    ```

- and in *dashboard-page.component.css*:

    ```CSS
    .dashboard-container {
        padding: 2rem 3rem;
    }

    .navbar {
        padding: 0.5rem 3rem;
        border: 1px solid #DDDDDD;
    }

    .fx-main-logo {
        width: 70px;
        height: 50px;
    }

    .btn-logout {
        border: 1px solid #dddddd;
        color: #7c7c7c;
    }

    .btn-logout:hover {
        background-color: #F2F2F2;
        opacity: 0.8;
    }
    ```

## Exercise 2 - Blotter View page

### Transaction model

- create a new folder named *models* into *Day-2\Exercise\Code\fx-trading-app\src\app* which will contain all required models:

    ```bash
    cd Day-2\Exercise\Code\fx-trading-app\src\app\
    mkdir models
    cd models
    ```

- let's make a new file there, named *transaction.ts*,representing the *Transaction* model:

    ```JavaScript
    export interface Transaction {
        id?: number;
        username: string;
        primaryCcy: string
        secondaryCcy: string;
        rate: number;
        action: string;
        notional: number;
        tenor: string;
        date: number;
        ccyPair?: string
    }
    ```

### Constants file

- to have all backend URLs in one place we need to create a _constants.ts_ file in _Day-2\Exercise\Code\fx-trading-app\src\app_:

  ```Javascript
  export const authApi = 'http://localhost:8200'
  export const tradeApi = 'http://localhost:8210'
  export const quoteApi = 'http://localhost:8220'

  export const backendUrl = {
    authService: {
      authenticate: `${authApi}/user/authenticate`,
      register: `${authApi}/user/register`,
    },
    fxTradeService: {
      getTransactions: `${tradeApi}/transactions`,
      saveTransaction: `${tradeApi}/transactions`,
    },
    quoteService: {
      getCurrencies: `${quoteApi}/currencies`,
      getFxRate: `${quoteApi}/fx-rate`
    }
  }
  ```

### Trade service

- create a new folder named *services* into *Day-2\Exercise\Code\fx-trading-app\src\app* which will contain all services from our application:

    ```bash
    cd Day-2\Exercise\Code\fx-trading-app\src\app\
    mkdir services
    cd services
    ```

- add a new file there, *trade.service.ts*, which will contain all API calls needed to get data from JSON Server
- our first method from *trade.service.ts* will get all the transactions to be displayed in the table from the right side of the page:

    ```JavaScript
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Transaction } from 'src/app/models/transaction';
    import { Observable } from 'rxjs/internal/Observable';

    import { backendUrl } from '../constants';

    @Injectable()
    export class TradeService {

        constructor(
            private http: HttpClient
        ) { }

        getTransactions() {
            return this.http.get(backendUrl.fxTradeService.getTransactions) as Observable<Transaction[]>
        }
    }

    ```

- so, *getTransactions()* method will call the API defined in constants (*backendUrl.fxTradeService.getTransactions*) through HTTP

### Update Application Module

- in *app.module.ts*, include *Trade Service*:

```JavaScript
import { TradeService } from './services/trade.service';

providers: [
    ...,
    TradeService,
    ...
]
```

- in *app.module.ts*, add also *Forms* module in order to use them:

```JavaScript
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

 imports: [
    ...,
    FormsModule,
    ReactiveFormsModule,
    ...
 ]
```

- include *Http Client*:

```JavaScript
import { HttpClientModule } from '@angular/common/http';

imports: [
    ...,
    HttpClientModule,
    ...
  ]
```

### Implement polling mechanism

- we want to simulate the real-time behavior for getting the transactions. This is the reason why we implement polling mechanism.
- so, we should add a new method in *trade.service.ts*, which will make a call to get all transactions every 2 seconds:

    ```JavaScript
    import { interval } from "rxjs";
    import {startWith, switchMap} from "rxjs/operators";

    getTransactionsPolling() {
            return interval(2000)
                .pipe(
                    startWith(0),
                    switchMap(() => this.http.get(backendUrl.fxTradeService.getTransactions)
                )
            ) as Observable<Transaction[]>
        }
    ```

### Blotter View component

- **blotter-view.component.html**:

    ```HTML
    <div class="title title-border">
    <h4>Blotter View</h4>
    </div>
    <div class="filter-container">
    <span class="flex-vertical-centered filter-label">Filters</span>
    <span class="flex-vertical-centered filter-separator">|</span>
    <div class="filter-input-container">
        <div class="flex-vertical-centered filter-group">
        <span>Ccy&nbsp;Pair&nbsp;&nbsp;</span>
        <select name="Ccy" id="Ccy" class="form-control form-control-sm" [(ngModel)]="filter.ccyPair" (ngModelChange)="filterBy($event)">
            <option value="" selected>Please select&nbsp;&nbsp;</option>
            <option *ngFor="let currencyPair of currenciesPairs" [value]="currencyPair">{{ currencyPair }}</option>
        </select>
        </div>

        <div class="flex-vertical-centered filter-group">
        <span for="dateFilter">Date&nbsp;&nbsp;</span>
        <div class="input-group input-group-sm">
            <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Please select&nbsp;"
            [(ngModel)]="filter.date"
            (ngModelChange)="filterBy($event)"
            [bsConfig]="{ dateInputFormat: 'DD/MM/YYYY' }"
            bsDatepicker>
            <div class="input-group-append">
            <span class="input-group-text calendar-icon" id="date-picker-icon">
                <i class="fa fa-calendar-alt icon" aria-hidden="true"></i>
            </span>
            </div>
        </div>
        </div>
    </div>
    </div>

    <div class="table-responsive">
    <table class="table table-striped table-sm">
        <thead class="blotter-table-header">
        <tr>
            <th>ID</th>
            <th>
            <span>Username&nbsp;</span>
            </th>
            <th>
            <span>Ccy Pair&nbsp;</span>
            </th>
            <th>Rate</th>
            <th>
            <span>Action&nbsp;</span>
            </th>
            <th>
            <span>Notional&nbsp;</span>
            </th>
            <th>Tenor</th>
            <th>
            <span>Transaction Date&nbsp;</span>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let transaction of transactions">
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.username }}</td>
            <td>{{ transaction.ccyPair }}</td>
            <td>{{ transaction.rate | number }}</td>
            <td>{{ transaction.action }}</td>
            <td>{{ transaction.notional | number }}</td>
            <td>{{ transaction.tenor }}</td>
            <td>{{ transaction.date | date:'dd/MM/yyyy HH:mm' }}</td>
        </tr>
        </tbody>
    </table>
    </div>
    ```

- here we display a table containing the following information from all transactions got from the backend:
  - id
  - username
  - ccyPair
  - rate
  - action
  - notional
  - tenor
  - date

- **blotter-view.component.css**:

    ```CSS
    .filter-container {
        margin-bottom: 22px;
        display: flex;
    }

    .filter-label {
        text-transform: uppercase;
        font-weight: bold;
    }

    .filter-separator {
        color: rgb(221,221,221);
        margin-left: 10px;
        margin-right: 10px;
    }

    .filter-input-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
    }

    .filter-group {
    margin-right: 15px;
    }

    .calendar-icon {
        background-color: white;
        color: #7C7C7C;
    }

    .calendar-icon > i {
        font-size: 18px;
    }

    .blotter-table-header {
        background: #3496F0;
        color: white;
        overflow: hidden;
        white-space: nowrap;
    }

    .blotter-table-header th {
        padding-bottom: 6px;
        padding-top: 6px;
    }
    ```

- **blotter-view.component.ts**:

    ```JavaScript
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

    private filter = {
        ccyPair: '',
        date: ''
    };

    private unsubscribe = new Subject();
    private transactions: Transaction[] = [];
    private initialTransactions: Transaction[] = [];
    private currenciesPairs: string[] = [];

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
            .map(transaction => ({ ...transaction, ccyPair: `${transaction.primaryCcy}/${transaction.secondaryCcy}`}))
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
    ```

- so, we have the following behavior:

  - when we initiate this component (*ngOnInit*), we should call *startPolling* method, which calls *tradeService.getTransactionsPolling()*
  - after getting all transactions, *startPolling* method:
    - adds *ccyPair* property to all transactions by concatenating *primaryCCY* and *secondaryCCY*
    - gets all *currenciesPairs* to fill in the filter select
    - applies default sort and filter (with no criteria)
  - *filterBy* method does the filtering functionality - by ccyPair and/or date
  - *ngOnDestroy* unsubscribes from getting transactions

## Exercise 3 - FX Rates View page

### Rate model

- into *Day-2/Exercise/Code/fx-trading-app/src/app/models*, let's make a new file, named *rate.ts*, representing the *Rate* model:

    ```JavaScript
    export interface Rate {
        buyRate: number;
        sellRate: number;
        ts: number;
    }
    ```

### Widget model

- in the same location, *Day-2/Exercise/Code/ui/src/app/models*, we want to have the *widget* class (a new file is required, *widget.ts*):

    ```JavaScript
    export class Widget {

    constructor(
        public primaryCcy: string,
        public secondaryCcy: string,
        public buyRate: number,
        public sellRate: number,
        public notional: number,
        public tenor: string,
        public pickCCYState: boolean,
    ) {  }

    }
    ```

### Update Trade service

- we need some more methods in *trade.service.ts*:

  - one for saving the transaction (if the user press *Sell* or *Buy* buttons):

    ```JavaScript
    saveTransaction(transaction: Transaction) {
        return this.http.post(backendUrl.fxTradeService.saveTransaction, transaction) as Observable<any>
    }
    ```

  - in order to add a new widget, the user should pick 2 currencies (*Primary* and *Secondary*), then he will be able to view the rates also. For this purpose, 2 new methods will be created:

    ```JavaScript
    import { Rate } from 'src/app/models/rate';

    getCurrencies() {
            return this.http.get(backendUrl.quoteService.getCurrencies) as Observable<string[]>
    }

    getFxRate(primaryCcy: string, secondaryCcy: string) {
            return this.http.get(backendUrl.quoteService.getFxRate, { params: { primaryCcy, secondaryCcy } }) as Observable<Rate>
    }
    ```

  - as we have simulated a real-time behavior for getting and displaying the transactions, we will do the same for getting FX Rates:

    ```JavaScript
    getFxRatePolling(primaryCcy: string, secondaryCcy: string) {
            return interval(2000)
                .pipe(
                    startWith(0),
                    switchMap(() => this.http.get(backendUrl.quoteService.getFxRate, { params: { primaryCcy, secondaryCcy } })
                )
            ) as Observable<Rate>
    }
    ```

### Widget component

- **widget.component.html**:

    ```HTML
    <div class="content-widget">
    <!-- Close -->
    <span class="fa fa-times close" (click)="onDelete()"></span>

    <!-- Select currency step -->
    <div *ngIf="widget.pickCCYState">
        <h4 class="widget-title">Pick a currency</h4>
        <div class="content-container">
        <div class="form-inline form-inline-long form-group">
            <label class="label-long" for="primaryCcy">Primary</label>
            <select name="primaryCcy" id="primaryCcy" class="form-control" [(ngModel)]="widget.primaryCcy" required>
                <option value="" disabled selected>Please select</option>
                <option *ngFor="let currency of currencies" [value]="currency">{{ currency }}</option>
            </select>
            </div>
            <div class="form-inline form-inline-long form-group">
            <label class="label-long" for="secondaryCcy">Secondary</label>
            <select name="secondaryCcy" id="secondaryCcy" class="form-control" [(ngModel)]="widget.secondaryCcy" required>
                <option value="" disabled selected>Please select</option>
                <option *ngFor="let currency of currencies" [value]="currency">{{ currency }}</option>
            </select>
            </div>
            <div class="btn-wraper">
            <button class="btn btn-primary" (click)="onPickCurrency()">Ok</button>
            </div>
        </div>
    </div>

    <!-- Trade step -->
    <div *ngIf="!widget.pickCCYState">
        <!-- Title -->
        <h4 class="widget-title no-border">
        <span class="widget-primary">{{ widget.primaryCcy }}</span>/{{ widget.secondaryCcy }}
        <span class="fa fa-exchange-alt exchange" (click)="onCCYChange()"></span>
        </h4>
        <!-- Rates -->
        <div class="rates-container">
        <div>
            <span class="widget-subtitle">SELL: </span>
            <span class="rate">{{ widget.sellRate | number:'1.1-2' }}</span>
            <span class='fa' [ngClass]="{'fa-caret-up rate-up': sellRateTrend === 'up', 'fa-caret-down rate-down': sellRateTrend === 'down' }"></span>
        </div>
        <div>
            <span class="widget-subtitle">BUY: </span>
            <span class="rate">{{ widget.buyRate | number:'1.1-2' }}</span>
            <span class="fa" [ngClass]="{'fa-caret-up rate-up': buyRateTrend === 'up', 'fa-caret-down rate-down': buyRateTrend === 'down' }"></span>
        </div>
        </div>
        <div class="content-container">
        <!-- Form  -->
        <div class="form-inline form-group">
            <label class="label-short" for="amount">Amount</label>
            <input type="number" class="form-control" id="amount" placeholder="Type the amount" [(ngModel)]="widget.notional"
            required>
        </div>
        <div class="form-inline form-inline-short form-group">
            <label class="label-short" for="primaryCcy">Tenor</label>
            <select name="tenor" id="tenor" class="form-control" [(ngModel)]="widget.tenor" required>
            <option value="" disabled selected>Please select</option>
            <option *ngFor="let tenor of tenors" [value]="tenor">{{ tenor }}</option>
            </select>
        </div>
        <!-- Buttons  -->
        <div class="btns-wrapper">
            <button class="btn btn-primary" (click)="onSell()">Sell</button>
            <button class="btn btn-success" (click)="onBuy()">Buy</button>
        </div>
        </div>
    </div>
    </div>
    ```

- we can notice here:

  - a widget can be deleted by pressing the close icon from top-right corner of it
  - there are 2 types of widgets:
    - one which allows adding a new currency pair to let the user follow SELL and BUY rates. This contains 2 dropdowns where *Primary* and *Secondary* currencies can be selected - the ones obtained by calling the backend through *getCurrencies()* method from *trade.service.ts*
    - the other which allows saving a transaction. For this, the user have to enter the amount he wants to trade, the tenor (*SP* - now, *1M* - in a month or *3M* - in three months) and then press on the button which describes the action he want to do: *Sell* or *Buy*

- **widget.component.css**:

    ```CSS
    .content-widget {
        width: 100%;
        position: relative;
    }

    .widget-title {
        padding: 1rem 1rem 10px;
        border-bottom: 1px solid #DDDDDD;
        margin: 0;
        font-size: 20px;
        font-weight: bold;
    }

    .widget-subtitle {
        font-size: 20px;
        color: #7C7C7C;
        font-weight: bold;
    }

    .widget-primary {
        font-size: 24px;
        color: #373A3C;
    }

    .widget-primary-currency {
        color: #373A3C;
        font-size: 24px;
    }

    .label-long {
        width: 80px;
        justify-content: flex-start;
    }

    .label-short {
        width: 60px;
        justify-content: flex-start;
    }

    .form-control {
        display: flex;
        flex-grow: 1;
    }

    .btn-wraper {
        display: grid;
        justify-content: flex-end;
    }

    .btns-wrapper {
        display: flex;
        justify-content: space-between;
    }

    .rates-container {
        display: flex;
        justify-content: space-between;
        background: #F2F2F2;
        padding: 10px 1rem;
    }

    .rate-up {
        color: green;
    }

    .rate-down {
        color: red;
    }

    .rate {
        font-size: 30px;
        font-weight: bold;
    }

    .content-container {
        padding: 1rem;
    }

    .close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 15px;
    }

    .no-border {
        border:0;
    }

    .exchange {
        color: #F0AD4E;
        font-size: 18px;
        cursor: pointer;
    }

    @media only screen and (max-width: 1440px) {
        .rate {
            font-size: 26px;
        }
    }
    ```

- **widget.component.ts**:

    ```JavaScript
    import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
    import { Widget } from 'src/app/models/widget';
    import { TradeService } from 'src/app/services/trade.service';
    import { Subject } from 'rxjs';
    import { takeUntil } from 'rxjs/operators';
    import { ToastrService } from 'ngx-toastr';

    @Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css']
    })
    export class WidgetComponent implements OnInit, OnDestroy {
    tenors = ['SP', '1M', '3M'];
    unsubscribe = new Subject();
    buyRateTrend: string;
    sellRateTrend: string;

    @Input() widget: Widget;
    @Input() index: number;
    @Input() currencies: string[];
    @Output() deleted = new EventEmitter<number>();

    constructor(
        private tradeService: TradeService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
    }

    onDelete() {
        this.deleted.emit(this.index);
    }

    onSell() {
        const { notional, tenor } = this.widget;
        if (notional && tenor) {
        const username: string  = JSON.parse(localStorage.getItem('currentUser')).username;
        this.tradeService.saveTransaction({
        username: username,
        primaryCcy: this.widget.primaryCcy,
        secondaryCcy: this.widget.secondaryCcy,
        rate: this.widget.sellRate,
        action: 'SELL',
        notional: this.widget.notional,
        tenor: this.widget.tenor,
        date: Math.round(new Date().getTime()/1000)
        }).subscribe(response => {
            this.toastr.success('Transaction saved!');
        })
        }
        else {
        this.toastr.error('Please fill in both Amount and Tenor!');
        }
    }

    onBuy() {
        const { notional, tenor } = this.widget;
        if (notional && tenor) {
        const username: string  = JSON.parse(localStorage.getItem('currentUser')).username;
        this.tradeService.saveTransaction({
        username: username,
        primaryCcy: this.widget.primaryCcy,
        secondaryCcy: this.widget.secondaryCcy,
        rate: this.widget.buyRate,
        action: 'BUY',
        notional: this.widget.notional,
        tenor: this.widget.tenor,
        date: Math.round(new Date().getTime()/1000)
        }).subscribe(response => {
            this.toastr.success('Transaction saved!');
        })
        }
        else {
        this.toastr.error('Please fill in both Amount and Tenor!');
        }
    }

    onCCYChange() {
        this.switchCCY()
    }

    switchCCY() {
        const tempCCY = this.widget.primaryCcy;
        this.widget.primaryCcy = this.widget.secondaryCcy;
        this.widget.secondaryCcy= tempCCY;
    }

    startPolling() {
        const { primaryCcy, secondaryCcy } = this.widget;
        this.tradeService.getFxRatePolling(primaryCcy, secondaryCcy)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((response) => {

            this.buyRateTrend = this.widget.buyRate > response.buyRate ? 'down' : 'up'
            this.sellRateTrend = this.widget.sellRate > response.sellRate ? 'down' : 'up'

            this.widget.buyRate = response.buyRate;
            this.widget.sellRate = response.sellRate;
        });
    }

    onPickCurrency() {
        const { primaryCcy, secondaryCcy } = this.widget;
        if (primaryCcy && secondaryCcy && primaryCcy !== secondaryCcy) {
        this.widget.pickCCYState = false;
        this.startPolling();
        }
        else if (!primaryCcy || !secondaryCcy) {
        this.toastr.error('Please select both Primary and Secondary Currencies!');
        }
        else {
        this.toastr.error('Please select different Primary and Secondary Currencies!');
        }
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
        }
    }
    ```

- in *Widget Component*, we can see many functionalities implemented:
  - *onDelete*: when the user removes a widget
  - *onSell*: save the transaction with *sell* action
  - *onBuy*: save the transaction with *buy* action
  - *onCCYChange*: switch the primary currency with the secondary one
  - *startPolling*: get FX Rates through polling to simulate real-time behavior
  - *onPickCurrency*: when a new widget is added with primary and secondary currencies, start polling FX Rates

### FX Rates View component

- FX Rates View component is the left-side of the screen, containing all *Widget* Components

- **fx-rates-view.component.html**:

    ```HTML
    <h4 class="title">Fx Rates View</h4>
    <div class="container-widget">
        <app-widget
            *ngFor="let widget of widgets; let i=index"
            class="widget"
            [widget]="widget"
            [index]="i"
            [currencies]="currencies"
            (deleted)="onDeleteWidget($event)"
        >
        </app-widget>
        <button class="button-widget" (click)="onAddWidget()">
            <span class="fa fa-plus button-plus"></span>
        </button>
    </div>
    ```

- so, as we can see:

  - we use *Widget* Component (*app-widget*) for all widgets we have
  - we have the possibility to add a new widget by clicking on a button

- **fx-rates-view.component.css**:

    ```CSS
    .container-widget {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-right: 2rem;
    }

    .button-widget {
        width: 47%;
        height: 250px;
        border: 1px solid grey;
        border-radius: 5px;
        padding: 10px;
    }

    .button-plus {
        font-size: 60px;
        color: grey;
    }

    .widget {
        display: flex;
        flex-basis: 47%;
        border: 1px solid grey;
        border-radius: 5px;
        margin-bottom: 2.5rem;
        height: 297px;
    }

    @media only screen and (max-width: 1440px) {
        .rate {
            font-size: 26px;
        }
    }
    ```

- **fx-rates-view.component.ts**:

    ```JavaScript
    import { Component, OnInit } from '@angular/core';
    import { Widget } from 'src/app/models/widget';
    import { TradeService } from 'src/app/services/trade.service';

    @Component({
    selector: 'app-fx-rates-view',
    templateUrl: './fx-rates-view.component.html',
    styleUrls: ['./fx-rates-view.component.css']
    })
    export class FxRatesViewComponent implements OnInit {
        widgets: Widget[] = [];
        currencies: string[] = [];

        constructor(
            private tradeService: TradeService
        ) { }

        ngOnInit() {
            this.tradeService.getCurrencies().subscribe((response) => {
            this.currencies = response;
            })
        }

        onAddWidget() {
            this.widgets = [...this.widgets, new Widget('', '', 0, 0, null, '', true)]
        }

        onDeleteWidget(index: number) {
            this.widgets.splice(index, 1);
        }
    }
    ```

- in this class:
  - we get all currencies from backend at initialization
  - when a new widget is added, a new *Widget* component is created with default/empty values
  - when a widget is removed, *onDeleteWidget* method is called, which uses the JavaScript *splice* method
