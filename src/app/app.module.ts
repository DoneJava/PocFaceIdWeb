import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { NgxEchartsModule } from 'ngx-echarts';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { WebcamModule } from 'ngx-webcam';
import { PaintableModule } from 'paintablejs/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './components/camera/camera.component';
import { CavasComponent } from './components/cavas/cavas.component';
import { FacesComponent } from './components/faces/faces.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormComponent } from './components/form/form.component';
import { MapaDeQuestoesComponent } from './components/mapa-de-questoes/mapa-de-questoes.component';
import { ModalComponent } from './components/modal/modal.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ValidadorHiddenComponent } from './components/validador-hidden/validador-hidden.component';
import { InterceptorModule } from './interceptors/interceptor.module';
import { MatModuleModule } from './shared/mat-module.module';
import { AdmSpaceComponent } from './views/adm-space/adm-space.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { TestComponent } from './views/test/test.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CameraComponent,
    FormComponent,
    SpinnerComponent,
    ToolbarComponent,
    ForgotPasswordComponent,
    TestComponent,
    ModalComponent,
    ValidadorHiddenComponent,
    FacesComponent,
    SideBarComponent,
    MapaDeQuestoesComponent,
    CavasComponent,
    AdmSpaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    WebcamModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    InterceptorModule,
    MaterialFileInputModule,
    MDBBootstrapModule.forRoot(),
    MdbCheckboxModule,
    PaintableModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
