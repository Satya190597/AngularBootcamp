import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { IconComponent } from './component/icon/icon.component';

// Font-Awesome Module
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Toastr Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
