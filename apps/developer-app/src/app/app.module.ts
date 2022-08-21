import { MatrixCreateComponent } from './center-matrix/components/matrix-create/matrix-create.component';
import { Interceptor } from './interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatrixListComponent } from './center-matrix/components/matrix-list/matrix-list.component';
import { CenterMatrixService } from './center-matrix/services/center-matrix.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatrixViewComponent } from './center-matrix/components/matrix-view/matrix-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/matrixList', pathMatch: 'full' },
  { path: 'matrixList', component: MatrixListComponent },
  { path: 'createMatrix', component: MatrixCreateComponent },
  { path: 'viewMatrix', component: MatrixViewComponent },
];

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, MatrixListComponent, MatrixCreateComponent, MatrixViewComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    CenterMatrixService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
