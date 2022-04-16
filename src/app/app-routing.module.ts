import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { FlowerGalleryComponent } from './flower-gallery/flower-gallery.component';
import { AllBundlesComponent } from './all-bundles/all-bundles.component';
import { AllPremadeBouquetsComponent } from './all-premade-bouquets/all-premade-bouquets.component';
import { AllAddOnsComponent } from './all-add-ons/all-add-ons.component';
import { AllGiftCardTypesComponent } from './all-gift-card-types/all-gift-card-types.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { MyCreditCardsComponent } from './my-credit-cards/my-credit-cards.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ViewBundleComponent } from './item-views/view-bundle/view-bundle.component';
import { ViewAddOnComponent } from './item-views/view-add-on/view-add-on.component';
import { ViewPremadeBouquetComponent } from './item-views/view-premade-bouquet/view-premade-bouquet.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'bundles', component: AllBundlesComponent },
  { path: 'premadeBouquets', component: AllPremadeBouquetsComponent },
  { path: 'addOns', component: AllAddOnsComponent },
  { path: 'giftCards', component: AllGiftCardTypesComponent },
  { path: 'flowerGallery', component: FlowerGalleryComponent },
  { path: 'myProfile', component: MyProfileComponent },
  { path: 'myOrders', component: MyOrdersComponent },
  { path: 'myAddresses', component: MyAddressesComponent },
  { path:'myCreditCards', component: MyCreditCardsComponent},
  { path: 'accessRightError', component: AccessRightErrorComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'viewBundle', component: ViewBundleComponent },
  { path: 'viewBundle/:bundleId', component: ViewBundleComponent },
  { path: 'viewAddOn', component: ViewAddOnComponent },
  { path: 'viewAddOn/:addOnId', component: ViewAddOnComponent },
  { path: 'viewPremadeBouquet', component: ViewPremadeBouquetComponent },
  { path: 'viewPremadeBouquet:/premadeBouquetId', component: ViewPremadeBouquetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
