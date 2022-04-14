import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { FlowerGalleryComponent } from './flower-gallery/flower-gallery.component';
import { RegisterNewCustomerComponent } from './register-new-customer/register-new-customer.component';
import { AllBundlesComponent } from './all-bundles/all-bundles.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'bundles', component: AllBundlesComponent },
  { path: 'flowerGallery', component: FlowerGalleryComponent },
  { path: 'registerNewCustomer', component: RegisterNewCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
