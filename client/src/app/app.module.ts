import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrderStatisticsPageComponent } from './order-statistics-page/order-statistics-page.component';
import { OrderCreatePageComponent } from './order-create-page/order-create-page.component';
import { FocusDirective } from './shared/directives/focus.directive';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    OrderPageComponent,
    LoaderComponent,
    OrderStatisticsPageComponent,
    OrderCreatePageComponent,
    FocusDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
