import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { BlotterViewComponent } from './pages/dashboard-page/blotter-view/blotter-view.component';
import { FxRatesViewComponent } from './pages/dashboard-page/fx-rates-view/fx-rates-view.component';
import { WidgetComponent } from './pages/dashboard-page/widget/widget.component';

import { TradeService } from './services/trade.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    RegisterPageComponent,
    BlotterViewComponent,
    FxRatesViewComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    TradeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
