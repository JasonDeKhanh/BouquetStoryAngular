import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { FlowerGalleryComponent } from './flower-gallery/flower-gallery.component';
import { AllBundlesComponent } from './all-bundles/all-bundles.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyAddressesComponent } from './my-addresses/my-addresses.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'bundles', component: AllBundlesComponent },
  { path: 'flowerGallery', component: FlowerGalleryComponent },
  { path: 'myProfile', component: MyProfileComponent },
  { path: 'myOrders', component: MyOrdersComponent },
  { path: 'myAddresses', component: MyAddressesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
