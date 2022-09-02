// регистрируем routes
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrderStatisticsPageComponent } from './order-statistics-page/order-statistics-page.component';
import { OrderCreatePageComponent } from './order-create-page/order-create-page.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
    ]
  },
  {
    path: '', component: SiteLayoutComponent, children: [
      {path: '', redirectTo: '/my-order', pathMatch: 'full'},
      {path: 'my-order', component: OrderPageComponent},
      {path: 'order-create', component: OrderCreatePageComponent},
      {path: 'order-statistics', component: OrderStatisticsPageComponent}
    ]
  },
  {
    path: '**',
    redirectTo: '/my-order',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
