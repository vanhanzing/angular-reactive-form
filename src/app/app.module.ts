import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';

import { HeaderComponent } from './header/header.component';
import { FormsComponent } from './forms/forms.component';

// route
import { AppRoutingModule } from './app-routing.module';
// material modules
import { MaterialDesignModule } from './material-design.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormsComponent,
    ReactiveFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
