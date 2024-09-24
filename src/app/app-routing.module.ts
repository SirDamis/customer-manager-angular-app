import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomerCreateComponent } from './customer.create/customer.create.component';

const routes: Routes = [
  {
    path: "customers",
    component: CustomerComponent
  },
  {
    path: "",
    redirectTo: "/customers",
    pathMatch: "full"
  },
  {
    path: "customers/new",
    component: CustomerCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
