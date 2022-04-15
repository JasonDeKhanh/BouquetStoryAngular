import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { FlowerGalleryComponent } from './flower-gallery/flower-gallery.component';
import { AllBundlesComponent } from './all-bundles/all-bundles.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { MyCreditCardsComponent } from './my-credit-cards/my-credit-cards.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'bundles', component: AllBundlesComponent },
  { path: 'flowerGallery', component: FlowerGalleryComponent },
  { path: 'myProfile', component: MyProfileComponent },
  { path: 'myOrders', component: MyOrdersComponent },
  { path: 'myAddresses', component: MyAddressesComponent },
  {path:'myCreditCards', component: MyCreditCardsComponent},
  { path: 'accessRightError', component: AccessRightErrorComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
