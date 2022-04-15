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
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { AllAddOnsComponent } from './all-add-ons/all-add-ons.component';
import { AllBundlesComponent } from './all-bundles/all-bundles.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';

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
    AccessRightErrorComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
