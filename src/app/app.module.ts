import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainLayoutComponent} from "./modules/core/shared/components/main-layout/main-layout.component";
import { CheckImageLinkDirective } from './modules/core/directives/check-image-link.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CheckImageLinkDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [
    MainLayoutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
