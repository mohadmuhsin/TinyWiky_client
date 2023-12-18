import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChartModule } from 'angular-highcharts';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './components/home/home.component';
import { WikiComponent } from './components/wiki/wiki.component';
import { AnalyticalDataComponent } from './components/analytical-data/analytical-data.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { adminGuardGuard } from './guards/admin-guard.guard';
import { InterceptorInterceptor } from './interceptor.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WikiComponent,
    AnalyticalDataComponent,
    AdminLoginComponent,
    NavbarComponent
  ],
  imports: [
    FormsModule,
    ChartModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    adminGuardGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
