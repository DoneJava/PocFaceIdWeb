
import { CameraComponent } from './components/camera/camera.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorComponent } from './views/validador/validador.component';



const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'foto', component: CameraComponent},
  {path: 'autenticar', component: ValidadorComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
