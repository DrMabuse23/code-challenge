import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';

import { CrudService } from './services/crud.service';

@NgModule({
  imports:      [ BrowserModule, NgbModule, HttpClientModule ],
  declarations: [ AppComponent, AddComponent ],
  providers:    [ CrudService ],
  bootstrap:    [ AppComponent ],
})
export class AppModule {}
