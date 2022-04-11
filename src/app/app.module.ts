import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
// You have to import MenuItem in the component where you are going to use it, 
// you can't import it in app.module.ts because you can't include it in ngmodule imports
import { TabViewModule } from 'primeng/tabview';
import { FlowerGalleryComponent } from './flower-gallery/flower-gallery.component';
import { DataViewModule } from 'primeng/dataview';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FlowerGalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    MenubarModule,
    TabViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
