import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {ClientmatrixComponent} from "./clientmatrix/clientmatrix-component";
import {ClientMatrixService} from "./shared/clientmatrix-service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, ClientmatrixComponent],
  imports: [HttpClientModule, BrowserModule, ReactiveFormsModule],
  providers: [ClientMatrixService],
  bootstrap: [AppComponent],
})
export class AppModule {}
