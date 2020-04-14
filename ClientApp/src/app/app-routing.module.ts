import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAddEditComponent } from './customer-add-edit/customer-add-edit.component';

const routes: Routes = [
  { path: '', component: CustomersComponent, pathMatch: 'full' },
  { path: 'customer/:id', component: CustomerComponent },
  { path: 'add', component: CustomerAddEditComponent },
  { path: 'customer/edit/:id', component: CustomerAddEditComponent },
  { path: '*', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
