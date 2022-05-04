import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { WebcamModule } from 'ngx-webcam';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './components/camera/camera.component';
import { FilesComponent } from './components/files/files.component';
import { FormComponent } from './components/form/form.component';
import { ModalComponent } from './components/modal/modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { InterceptorModule } from './interceptors/interceptor.module';
import { CompareComponent } from './views/compare/compare.component';
import { LoginComponent } from './views/login/login.component';
import { MenuComponent } from './views/menu/menu.component';
import { RegisterComponent } from './views/register/register.component';
import { ValidadorComponent } from './views/validador/validador.component';
import { MenuValidationComponent } from './views/menu-validation/menu-validation.component';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CameraComponent,
    ModalComponent,
    ValidadorComponent,
    FormComponent,
    SpinnerComponent,
    CompareComponent,
    MenuComponent,
    ToolbarComponent,
    FilesComponent,
    MenuValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    WebcamModule,
    MatDialogModule,
    NgbModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    InterceptorModule,
    MatToolbarModule,
    MatMenuModule,
    MaterialFileInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
