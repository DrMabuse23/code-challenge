import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './tss-matrix/list.component';
import { FormComponent } from './tss-matrix/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MaterialModule } from './tss-matrix/material.module';

const appRoutes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'create', component: FormComponent },
  { path: 'edit', component: FormComponent },
];

@NgModule({
  declarations: [AppComponent, FormComponent, ListComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), BrowserAnimationsModule, MatTableModule, MatPaginatorModule, MatSortModule, HttpClientModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
