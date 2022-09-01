import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainLayoutComponent} from "./modules/core/shared/components/main-layout/main-layout.component";
import { CheckImageLinkDirective } from './modules/core/directives/check-image-link.directive';
import {PageNotFoundComponent} from "./modules/core/shared/components/page-not-found/page-not-found.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CheckImageLinkDirective,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  exports: [
    MainLayoutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
