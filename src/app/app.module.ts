import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
// You have to import MenuItem in the component where you are going to use it, 
// you can't import it in app.module.ts because you can't include it in ngmodule imports
import { TabViewModule } from 'primeng/tabview';
import { FlowerGalleryComponent } from './flower-gallery/flower-gallery.component';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog'; //p-confirmDialog
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { AllAddOnsComponent } from './all-add-ons/all-add-ons.component';
import { AllBundlesComponent } from './all-bundles/all-bundles.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';
import { MyCreditCardsComponent } from './my-credit-cards/my-credit-cards.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { ConfirmationService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { ViewBundleDetailsComponent } from './productDetailsPages/view-bundle-details/view-bundle-details.component';
import { ViewAddOnDetailsComponent } from './productDetailsPages/view-add-on-details/view-add-on-details.component';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ViewBundleComponent } from './item-views/view-bundle/view-bundle.component';
import { ViewAddOnComponent } from './item-views/view-add-on/view-add-on.component';
import { ViewPremadeBouquetComponent } from './item-views/view-premade-bouquet/view-premade-bouquet.component';
import { AllPremadeBouquetsComponent } from './all-premade-bouquets/all-premade-bouquets.component';
import { AllGiftCardTypesComponent } from './all-gift-card-types/all-gift-card-types.component';
import { CreateYourOwnBouquetComponent } from './create-your-own-bouquet/create-your-own-bouquet.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SplitterModule } from 'primeng/splitter';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { ViewGiftCardTypeComponent } from './item-views/view-gift-card-type/view-gift-card-type.component';
import {CarouselModule} from 'primeng/carousel';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FlowerGalleryComponent,
    AllAddOnsComponent,
    AllBundlesComponent,
    MyProfileComponent,
    MyOrdersComponent,
    MyAddressesComponent,
    ShoppingCartComponent,
    AccessRightErrorComponent,
    MyCreditCardsComponent,
    ViewBundleDetailsComponent,
    ViewAddOnDetailsComponent,
    ViewBundleComponent,
    ViewAddOnComponent,
    ViewPremadeBouquetComponent,
    AllPremadeBouquetsComponent,
    AllGiftCardTypesComponent,
    CreateYourOwnBouquetComponent,
    ViewGiftCardTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    TabViewModule,
    DataViewModule,
    InputTextModule,
    PanelModule,
    DropdownModule,
    DialogModule,
    RippleModule,
    TableModule,
    MenuModule,
    MultiSelectModule,
    SplitButtonModule,
    ConfirmDialogModule,
    // ConfirmationService,
    ToolbarModule,
    ToastModule,
    DividerModule,
    InputNumberModule,
    InputMaskModule,
    RadioButtonModule,
    CalendarModule,
    ScrollPanelModule,
    SplitterModule,
    MessagesModule,
    MessageModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
