import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { AdminLinkDirective } from './admin-link.directive';
import { AdminModule } from './admin/admin.module';
import { ConvertToEuroPipe } from './convert-to-euro.pipe';
import { BackendApiService } from './backend-api.service';

@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    AdminLinkDirective,
    ConvertToEuroPipe
  ],
  imports: [
    BrowserModule,
    AdminModule
  ],
  providers: [BackendApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
